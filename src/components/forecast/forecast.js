import {
    Accordion,
    AccordionItemHeading,
    AccordionItem,
    AccordionItemPanel,
    AccordionItemButton,
} from "react-accessible-accordion";
import './forecast.css';

const WEEK_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const Forecast = ({ data }) => {
    const currentDay = new Date().getDay();
    const forecastDays = WEEK_DAYS.slice(currentDay, WEEK_DAYS.length).concat(WEEK_DAYS.slice(0, currentDay));

    return (
        <>
            <label className="title">Daily</label>
            <Accordion allowZeroExpanded>
                {data.list.slice(0, 7).map((item, index) => (
                    <AccordionItem key={index}>
                        <AccordionItemHeading>
                            <AccordionItemButton>
                                <div className="daily-item">
                                    <img
                                        alt="weather"
                                        className="icon-small"
                                        src={`icons/${item.weather[0].icon}.png`}
                                    />
                                    <label className="day">{forecastDays[index]} </label>
                                    <label className="description">{item.weather[0].description} </label>
                                    <label className="min-max">{Math.round(item.main.temp_min)}°F / {Math.round(item.main.temp_max)}°F</label>
                                </div>
                            </AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel>
                            <div className="daily-details-grid">
                                <div className="daily-details-grid-item">
                                    <label>Pressure</label>
                                    <label>{item.main.pressure} hPa</label>
                                </div>
                                <div className="daily-details-grid-item">
                                    <label>Humidity</label>
                                    <label>{item.main.humidity}%</label>
                                </div>
                                <div className="daily-details-grid-item">
                                    <label>Feels like:</label>
                                    <label>{Math.round(item.main.feels_like)}°F </label>
                                </div>
                            </div>
                        </AccordionItemPanel>
                    </AccordionItem>
                ))}
            </Accordion>
        </>
    );
};

export default Forecast;