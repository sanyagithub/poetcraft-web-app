import MeterModule from "./MeterModule"
import {useLocation} from "react-router-dom";
import {useEffect} from "react";

function TrochaicMeter() {
    const location = useLocation();

    useEffect(() => {
        if (!window.gtag) return;

        window.gtag("config", "G-B118D7BLD5", {
            page_path: location.pathname + location.search,
        });
    }, [location]);

    return <MeterModule moduleType="trochaic" />
}

export default TrochaicMeter
