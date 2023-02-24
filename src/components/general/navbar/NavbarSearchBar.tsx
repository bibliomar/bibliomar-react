import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { MDBBtn, MDBInput } from "mdb-react-ui-kit";
import React from "react";
import { useWindowSize } from "../helpers/useWindowSize";

export default function NavbarSearchBar() {
    const { width } = useWindowSize();
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: { query: "" },
        onSubmit: (values) => {
            navigate(`/search?category=any&q=${values.query}`);
        },
    });

    return (
        <form
            onSubmit={formik.handleSubmit}
            className="d-flex input-group justify-content-center
                                        justify-content-lg-end me-0 me-lg-5 mt-3 mt-lg-0 w-100"
        >
            <MDBInput
                name="query"
                id="query"
                type="search"
                size={"lg"}
                wrapperClass={width <= 1024 ? "w-75" : undefined}
                value={formik.values.query}
                onChange={formik.handleChange}
            />
            <MDBBtn
                className={width <= 1024 ? "w-25" : undefined}
                color="primary"
                type="submit"
            >
                <i className="fas fa-search"></i>
            </MDBBtn>
        </form>
    );
}
