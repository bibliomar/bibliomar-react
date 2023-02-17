import { Metadata } from "../../general/helpers/generalTypes";
import { SavedBookEntry, SavedBooks } from "../../reader/helpers/readerTypes";
import { useTranslation } from "react-i18next";
import { libraryCategoryToLocaleText } from "../helpers/bookinfoFunctions";

interface Props {
    metadata: Metadata;
}

export default function BookInfoBadges({ metadata }: Props) {
    const { t } = useTranslation();
    return (
        <>
            <div className="badge book-info-badge me-1 mb-1">
                {metadata.topic === "fiction"
                    ? t("metadatainfo:fiction")
                    : t("metadatainfo:nonfiction")}
            </div>
            <div className="badge book-info-badge me-1 mb-1">
                {metadata.category ? t("metadatainfo:undefinedField") : null}
            </div>
            <div className="badge book-info-badge me-1 mb-1">
                {metadata.category
                    ? libraryCategoryToLocaleText(t, metadata.category)
                    : null}
            </div>
        </>
    );
}
