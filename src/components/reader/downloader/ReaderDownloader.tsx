import BlankLoadingSpinner from "../../general/BlankLoadingSpinner";
import Break from "../../general/Break";
import React, { useContext, useEffect, useRef, useState } from "react";
import ReaderDownloaderMessage from "./ReaderDownloaderMessage";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import fileToArrayBuffer from "file-to-array-buffer";
import { Book } from "../../general/helpers/generalTypes";
import { useNavigate } from "react-router-dom";
import ReaderBookOnList from "./ReaderBookOnList";
import { saveBookLocally, updateBookLocally } from "../helpers/readerFunctions";
import localforage from "localforage";
import differenceInMinutes from "date-fns/differenceInMinutes";
import differenceInSeconds from "date-fns/differenceInSeconds";
import {
    PossibleReaderScreenState,
    ReaderDownloaderProps,
} from "../helpers/readerTypes";

export default function ReaderDownloader({
    savedBooks,
    userLoggedIn,
    url,
    secondaryUrl,
    bookInfo,
}: ReaderDownloaderProps) {
    console.log("downloader");
    const navigate = useNavigate();

    const [failedFirstAttempt, setFailedFirstAttempt] =
        useState<boolean>(false);

    //Should be in KB.
    //KB = Byte * 1000
    const [downloadProgress, setDownloadProgress] = useState<number>(0);

    const [downloadStatus, setDownloadStatus] = useState<number>(0);
    const [downloadSize, setDownloadSize] = useState<number>(0);

    const downloadBook = async (requestUrl: string) => {
        const config: AxiosRequestConfig = {
            url: requestUrl,
            method: "GET",
            responseType: "blob",
            // Equals to 120 seconds.
            timeout: 120000,

            onDownloadProgress: (evt) => {
                //Transforms sizes from bytes to kb.
                const maxSize = evt.total / 1000;
                const loadedSize = evt.total / 1000;
                //Only sets downloadSize and status on first fired event.
                if (downloadStatus !== 201) {
                    setDownloadStatus(201);
                }
                if (maxSize !== downloadSize) {
                    setDownloadSize(maxSize);
                }

                setDownloadProgress(loadedSize);
            },
        };

        try {
            setDownloadStatus(103);
            let req: AxiosResponse = await axios.request(config);
            console.log(req);

            setDownloadStatus(200);
            const arrayBuffer = await fileToArrayBuffer(req.data);
            await saveBookLocally(arrayBuffer, bookInfo);
            // Saves current time in last-download, so we can define the last time the user has made a download.
            await localforage.setItem("last-download", new Date());
            const readerScreenState: PossibleReaderScreenState = {
                arrayBuffer: arrayBuffer,
                onlineFile: bookInfo,
                localFile: undefined,
            };
            navigate(`/reader/${bookInfo.md5}`, {
                state: readerScreenState,
                replace: true,
            });
        } catch (e: any) {
            console.error(e);
            setDownloadStatus(e.response ? e.response.status : 500);
            setTimeout(() => {
                if (!failedFirstAttempt) {
                    setFailedFirstAttempt(true);
                } else {
                    location.reload();
                }
            }, 2000);
            return;
        }
    };

    useEffect(() => {
        //For strict mode double mounting...
        let ignore = false;

        if (!ignore && url) {
            /*
            In minutes.
            If the user is logged, 1 minute restriction.
            If it's not, 5 minutes.
             */
            const downloadTimeLimit = userLoggedIn ? 1 : 5;
            /*
            In seconds.
            We wait for 15 seconds minimum because otherwise it could result in blocks from the servers.
             */
            const minDownloadTimeLimit = 15;

            /*
            In MB.
            If the user is logged, he can download up to 15mb.
            If it's not, 5mb.
             */
            const downloadSizeLimit = userLoggedIn ? 15 : 5;
            // If it's more than ~20, it's probably in Kb.
            const fileSize = Number.parseInt(bookInfo.size);
            const sizeInMb = bookInfo.size.includes("Mb");
            const sizeInGb = bookInfo.size.includes("Gb");

            if (sizeInGb) {
                setDownloadStatus(413);
                return;
            }
            if (sizeInMb && fileSize > downloadSizeLimit) {
                setDownloadStatus(413);
                return;
            }
            localforage
                .getItem<Date | null>("last-download")
                .then((lastDownloadTime) => {
                    if (lastDownloadTime != null) {
                        const differenceMinutes = differenceInMinutes(
                            new Date(),
                            lastDownloadTime
                        );
                        const differenceSeconds = differenceInSeconds(
                            new Date(),
                            lastDownloadTime
                        );
                        if (
                            differenceMinutes < downloadTimeLimit ||
                            differenceSeconds < minDownloadTimeLimit
                        ) {
                            setDownloadStatus(401);
                            return;
                        } else {
                            downloadBook(
                                failedFirstAttempt && secondaryUrl
                                    ? secondaryUrl
                                    : url
                            ).then();
                        }
                    } else {
                        downloadBook(
                            failedFirstAttempt && secondaryUrl
                                ? secondaryUrl
                                : url
                        ).then();
                    }
                });
        }

        return () => {
            ignore = true;
        };
    }, [failedFirstAttempt]);

    return (
        <div className="d-flex flex-wrap justify-content-center w-100">
            <div className="basic-container p-3">
                <BlankLoadingSpinner />
                <Break />
                <ReaderDownloaderMessage
                    downloadProgress={downloadProgress}
                    downloadStatus={downloadStatus}
                    downloadSize={downloadSize}
                    failedFirstAttempt={failedFirstAttempt}
                    userLoggedIn={userLoggedIn}
                />
                <Break />
                <span className="text-center text-muted mt-4">
                    Dica: você pode fazer outras coisas enquanto aguarda. O
                    servidor normalmente é lento. O download é reiniciado
                    automaticamente em caso de erro.
                </span>
            </div>
        </div>
    );
}
