import { MDBCol, MDBContainer } from "mdb-react-ui-kit";
import BookInfoCover from "./bookInfoSub/BookInfoCover";
import { Book } from "../general/helpers/generalTypes";
import BookInfoDownload from "./bookInfoSub/BookInfoDownload";
import { BookInfoSubProps } from "./BookInfoScreen";
import React, { useRef } from "react";
import Break from "../general/Break";
import SmallLine from "../general/SmallLine";
import BookInfoTitle from "./bookInfoSub/BookInfoTitle";
import BookInfoBadges from "./bookInfoSub/BookInfoBadges";
import BookInfoDescription from "./bookInfoSub/BookInfoDescription";
import BookInfoFile from "./bookInfoSub/BookInfoFile";
import BookInfoReadOnline from "./bookInfoSub/BookInfoReadOnline";
import BookInfoLibraryAdd from "./bookInfoSub/BookInfoLibraryActions/BookInfoLibraryAdd";
import BookInfoLibraryButtons from "./bookInfoSub/BookInfoLibraryActions/BookInfoLibraryButtons";
import BookInfoAuthors from "./bookInfoSub/BookInfoAuthors";

export default function BookInfoDesktop({
    bookInfo,
    userLogged,
    downloadLinks,
    error,
    description,
}: BookInfoSubProps) {
    const bookRef = useRef<Book>(bookInfo);
    // Shorthand to avoid writing .current everywhere.
    const book = bookRef.current;
    console.log(book);
    return (
        // Two flex containers because we want one to wrap and the other one not to.
        <div className="d-flex flex-wrap justify-content-center">
            <div className="d-flex">
                <div
                    id="cover-download-section"
                    className="ms-3 mt-4 mb-4 book-info-cover-section"
                >
                    <div className="d-flex flex-wrap justify-content-center w-100">
                        <BookInfoCover md5={book.md5} />
                        <Break />
                        <BookInfoDownload
                            downloadLinks={downloadLinks}
                            error={error}
                        />
                    </div>
                </div>

                <div
                    id="info-section"
                    className="ms-3 mt-4 mb-4 me-3 book-info-section"
                >
                    <div className="d-flex flex-wrap justify-content-start">
                        <div className="d-flex">
                            <div className="d-flex flex-wrap w-50">
                                <BookInfoTitle book={book} />
                                <Break />
                                <BookInfoAuthors book={book} />
                            </div>
                            <div className="d-flex flex-wrap w-50">
                                <BookInfoLibraryButtons
                                    bookRef={bookRef}
                                    className="ms-auto mb-3"
                                />
                            </div>
                        </div>

                        <Break />

                        <Break />
                        <SmallLine flexGrow />
                        <Break className="mb-2" />
                        <BookInfoFile book={book} />
                        <Break className="mb-2" />
                        <BookInfoBadges book={book} />
                        <Break className="mb-4" />
                        <BookInfoDescription description={description} />
                    </div>
                </div>
            </div>
            <Break />
            <SmallLine flexGrow className="me-4 ms-4" />
            <Break className="mt-2" />
            <BookInfoReadOnline book={book} downloadLinks={downloadLinks} />
        </div>
    );
}
