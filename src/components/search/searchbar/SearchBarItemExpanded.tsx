import { Highlighter } from "react-bootstrap-typeahead";
import React from "react";
import { Book } from "../../general/helpers/generalTypes";
import useCover from "../../general/helpers/useCover";
import BookFigureCover from "../../general/BookFigureCover";
import Break from "../../general/Break";
import {
    formatBytes,
    getBookInfoPath,
} from "../../general/helpers/generalFunctions";

interface Props {
    book: Book;
    timeout?: number;
}

export default function SearchBarItemExpanded({ book, timeout }: Props) {
    let uppercaseAuthor = "";
    if (book.author) {
        uppercaseAuthor = `${book.author[0].toUpperCase()}${book.author.slice(
            1,
            book.author.length
        )}`;
    }
    const extension = book.extension ? book.extension.toUpperCase() : null;
    const size = book.fileSize ? formatBytes(book.fileSize) : null;
    const extensionAndFormat =
        extension && size ? `${extension}, ${size}` : null;
    return (
        <div className="d-flex flex-wrap">
            <span style={{ fontSize: "1.0em" }} className="fw-bold">
                {book.title}
            </span>
            <Break />
            <span style={{ fontSize: "0.95em" }}>{uppercaseAuthor}</span>
            <Break />
            <span style={{ fontSize: "0.95em" }}>{extensionAndFormat}</span>
        </div>
    );
}
