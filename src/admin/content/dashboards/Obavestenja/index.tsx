import React from 'react';
import {Helmet} from "react-helmet-async";
import PageTitleWrapper from "../../../components/PageTitleWrapper";
import PageHeader from "../Bogosluzenja/PageHeader";

export default function DashboardObavestenja() {
    return (
        <>
            <Helmet>
                <title>Активности (Админ Панел)</title>
            </Helmet>
            <PageTitleWrapper>
                <PageHeader title='Обавештења'/>
            </PageTitleWrapper>
            <div>
                <span>Tekst</span>
            </div>
        </>
    );
}