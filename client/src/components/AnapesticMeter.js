import MeterModule from "./MeterModule"
import {useLocation} from "react-router-dom";
import {useEffect} from "react";

function AnapesticMeter() {
    const location = useLocation();

    useEffect(() => {
        if (!window.gtag) return;

        window.gtag("config", "G-B118D7BLD5", {
            page_path: location.pathname + location.search,
        });
    }, [location]);
    return <MeterModule moduleType="anapestic" />
}

export default AnapesticMeter
