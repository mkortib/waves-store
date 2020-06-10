import React from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Link } from 'react-router-dom';

import './faq.scss';

const Faq = () => {
    return (
        <div className="faq">
            <div className="faq-bg"></div>
            <div className="cm-container">
                <div className="faq-tabs">
                    <ExpansionPanel>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                            <h3 className="faq-tabs__title">
                                Can I use a heavier string gauge other than the
                                Phosphor Bronze Lights you ship the guitars
                                with?
                            </h3>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <div className="faq-tabs__descr">
                                YES. You can go up or down one gauge, usually
                                without needing to readjust your truss rod,
                                however if you use a much heavier or lighter
                                gauge this will put different amounts of tension
                                on the neck so an adjustment may be needed. When
                                changing string gauge allow some time for the
                                guitar to settle and then if needed have the
                                truss rod adjusted by a qualified technician.
                            </div>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <ExpansionPanel>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                            <h3 className="faq-tabs__title">
                                Can I use Steel strings on my Nylon string
                                guitar?
                            </h3>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <div className="faq-tabs__descr">
                                NO. Putting Steel strings on a Nylon string
                                guitar can add extra stress to the guitar top
                                and may cause the bridge to lift. These guitars
                                are braced differently and steel and nylon
                                strings are not interchangeable.
                            </div>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <ExpansionPanel>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                            <h3 className="faq-tabs__title">
                                What is the difference between Cedar and Spruce?
                            </h3>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <div className="faq-tabs__descr">
                                Cedar tends to produce a warmer sound and ages
                                faster than spruce. Spruce is brighter and ages
                                more over a longer period of time. Visually,
                                cedar is darker in color with a fairly tight
                                grain pattern. Spruce tends to be very blond
                                with a slightly wider grain pattern.
                            </div>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <ExpansionPanel>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                            <h3 className="faq-tabs__title">
                                What should I do if I have a question or comment
                                for customer service?
                            </h3>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <div className="faq-tabs__descr">
                                The fastest way to get a response regarding
                                questions about your Ernie Ball Music Man
                                instrument, parts, etc. is to email our customer
                                service team at
                                musicman_customerservice@ernieball.com
                            </div>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <ExpansionPanel>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                            <h3 className="faq-tabs__title">
                                How do I set up my Axis with double locking
                                tremolo?
                            </h3>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <div className="faq-tabs__descr">
                                Axis/Non-Floating Locking Tremolo Notes: The
                                Axis guitar is designed for the tremolo to sit
                                flat on the body, and only allow movement in the
                                dive-bomb direction. Because the bridge is
                                limited in its adjustability via the pivot
                                screws, the string height is primarily adjusted
                                by adding or removing shims from the neck
                                pocket. If you are not comfortable with removing
                                the neck from your guitar, do not attempt to
                                re-shim the neck. Instead, take your guitar to a
                                qualified tech or contact Music Man Customer
                                Service to arrange for your guitar to be sent to
                                the factory for a setup. If adjusting the
                                intonation, it's recommended to use full-size
                                hex drivers, preferably with a T-handle. It's
                                easiest to set the intonation using one 2.5mm
                                driver to loosen/tighten the intonation screw,
                                while simultaneously using a second driver to
                                move the saddle with some amount of string
                                tension still on the saddle. Keep in mind that
                                the entire Axis setup mainly amounts to the
                                truss rod adjustment and the shim in the neck
                                pocket. This guide may seem overly extensive,
                                but it is intended to explicitly describe the
                                processes needed to take the neck on and off,
                                work with the mechanics of a locking tremolo,
                                etc. The bulk of this guide is intended to check
                                all the metaphorical boxes of settings that
                                should already be correct on most guitars and
                                not require any adjustment.
                            </div>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                </div>
            </div>
            <div className="faq-touch">
                If you have question{' '}
                <Link to="/find_us" className="faq-touch__word">
                    Contact Us
                </Link>
            </div>
            <div className="about-us-care">
                <div className="about-us-care__img"></div>
                <div className="about-us-care__img">Yes we care</div>
                <div className="about-us-care__img"></div>
            </div>
        </div>
    );
};

export default Faq;
