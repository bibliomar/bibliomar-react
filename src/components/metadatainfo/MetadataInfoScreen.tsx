import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import React, {
    SetStateAction,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";
import { Metadata } from "../general/helpers/generalTypes";
import BookInfoDesktop from "./BookInfoDesktop";
import axios from "axios";
import { DownloadLinks } from "../general/helpers/generalTypes";
import { Size, useWindowSize } from "../general/helpers/useWindowSize";
import BookInfoMobile from "./BookInfoMobile";
import {
    backendUrl,
    findBookInLibrary,
} from "../general/helpers/generalFunctions";
import { SavedBookEntry, SavedBooks } from "../reader/helpers/readerTypes";
import localforage from "localforage";
import { findBookLocally } from "../reader/helpers/readerFunctions";
import BlankLoadingSpinner from "../general/BlankLoadingSpinner";
import useMetadata from "../general/helpers/useMetadata";
import { AuthContext } from "../general/helpers/generalContext";
import { toast, ToastContainer, useToastContainer } from "react-toastify";
import "./metadatainfo.css";

export interface BookInfoSubProps {
    metadata: Metadata;
    updateMetadata: () => Promise<void>;
}

export default function MetadataInfoScreen() {
    const params = useParams();
    const md5 = params.md5;
    const navigate = useNavigate();
    const authContext = useContext(AuthContext);

    const size: Size = useWindowSize();
    let topicContext: string | undefined = useOutletContext();
    if (topicContext == "sci-tech") {
        topicContext = "scitech";
    }
    const [metadata, updateMetadata] = useMetadata(md5, topicContext);

    useEffect(() => {
        if (md5 == null) {
            navigate("/metadataList/error", { replace: true });
            return;
        }
        const md5Match = md5.match("^[0-9a-fA-F]{32}$");
        if (md5Match == null) {
            navigate("/metadataList/error", { replace: true });
            return;
        }
    }, [md5, topicContext]);

    return (
        <>
            <div className="d-flex flex-column align-items-center">
                {metadata ? (
                    <div className="basic-container book-info-container mb-5">
                        {size.width > 1024 ? (
                            <BookInfoDesktop
                                metadata={metadata}
                                updateMetadata={updateMetadata}
                            />
                        ) : (
                            <BookInfoMobile
                                metadata={metadata}
                                updateMetadata={updateMetadata}
                            />
                        )}
                    </div>
                ) : (
                    <BlankLoadingSpinner />
                )}
                <ToastContainer
                    closeOnClick={true}
                    limit={5}
                    draggable
                    draggablePercent={50}
                />
            </div>
        </>
    );
}