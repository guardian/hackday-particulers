import express from "express";
import cheerio from "cheerio";
import axios from "axios";
import {
    ComprehendClient,
    BatchDetectEntitiesCommand,
} from "@aws-sdk/client-comprehend";
import fs from "fs";
import cors from "cors";

const rankings = JSON.parse(
    fs.readFileSync(new URL("./rankings2.json", import.meta.url))
);

const app = express();
const port = 3000;
const client = new ComprehendClient({
    region: "eu-west-1",
    credentials: {
        accessKeyId: "",
        secretAccessKey: "",
        sessionToken: "",
    },
});

app.options("*", cors());

const desmogOrgs = [
    "Koch Industries, Inc.",
    "SecondStreet.org",
    "The Steamboat Institute",
    "Net Zero Scrutiny Group",
    "Canadian Energy Centre (CEC)",
    "Fuelling Canada",
    "55 Tufton Street",
    "60 Plus Association",
    "Accuracy in Media",
    "Acton Institute",
    "Adam Smith Institute",
    "Aegis Strategic",
    "Africa Fighting Malaria",
    "African Centre for Advocacy and Human Development",
    "Alberta Prosperity Fund",
    "Alexis de Tocqueville Institution",
    "Alternate Solutions Institute",
    "America Rising LLC",
    "America Rising Squared",
    "Definers Public Affairs",
    "American Association of Blacks in Energy",
    "American Chemistry Council",
    "American Coalition for Clean Coal Electricity",
    "American Commitment",
    "American Conservative Union",
    "American Council for Capital Formation",
    "American Council on Science and Health",
    "American Encore",
    "American Energy Alliance (AEA)",
    "American Enterprise Institute",
    "American Fuel & Petrochemical Manufacturers (AFPM)",
    "American Future Fund",
    "American Institute for Economic Research",
    "American Legislative Exchange Council (ALEC)",
    "American Petroleum Institute",
    "American Tradition Institute",
    "Americans for Balanced Energy Choices",
    "Americans for Prosperity",
    "Americans for Tax Reform",
    "Annapolis Center for Science-Based Public Policy",
    "APCO Worldwide",
    "Atlantic Bridge",
    "Atlantic Legal Foundation",
    "Atlas Network",
    "Australian APEC Study Centre",
    "Australian Climate Science Coalition",
    "Australian Environment Foundation",
    "Australian Libertarian Society",
    "Australian Taxpayers' Alliance",
    "Austrian Economics Center",
    "Ayn Rand Institute",
    "Banks Mining",
    "Beacon Center of Tennessee",
    "Beacon Hill Institute",
    "Bill of Rights Institute",
    "Burn More Coal",
    "Business for Britain",
    "Californians for Affordable & Reliable Energy (CARE)",
    "Cambridge Analytica",
    "Canada Action",
    "Canadian Association of Petroleum Producers (CAPP)",
    "Capital Research Center",
    "CAR26",
    "Carbon Sense Coalition",
    "Cascade Policy Institute",
    "Cato Institute",
    "Center for Accountability in Science",
    "Center for Energy and Economic Development",
    "Center for Industrial Progress",
    "Center for Organizational Research and Education (CORE)",
    "Center for the Defense of Free Enterprise",
    "Center for the Study of Carbon Dioxide and Global Change",
    "Center of the American Experiment",
    "Centre for Brexit Policy",
    "Centre for Policy Studies",
    "Cieo",
    "Citizens for the Republic",
    "Citizens’ Alliance for Responsible Energy",
    "Civil Society Coalition on Climate Change",
    "Clear Energy Alliance",
    "Clexit",
    "Climate Intelligence Foundation (CLINTEL)",
    "Climate Study Group",
    "CO2 Coalition",
    "Coalition for Regulatory Innovation",
    "Coalition to Protect Patients’ Rights",
    "Committee for a Constructive Tomorrow (CFACT)",
    "Competitive Enterprise Institute",
    "Concerned Veterans for America",
    "Congress of Racial Equality (CORE)",
    "Consumer Action for a Strong Economy",
    "Consumer Choice Center",
    "Consumer Energy Alliance (CEA)",
    "Cooler Heads Coalition",
    "Copenhagen Consensus Center",
    "Cornwall Alliance for the Stewardship of Creation",
    "Council for a Competitive Economy",
    "CRC Advisors",
    "Cuadrilla Resources",
    "D. James Kennedy Ministries",
    "DCI Group",
    "Alliance for Wise Energy Decisions",
    "Democratic Unionist Party (DUP)",
    "Discovery Institute",
    "Doctors for Disaster Preparedness",
    "Donors Capital Fund",
    "DonorsTrust",
    "Dunn’s Foundation for the Advancement of Right Thinking",
    "Economists for Free Trade",
    "Edison Electric Institute",
    "Energy & Environment Legal Institute",
    "Energy and Environment (Journal)",
    "Energy Equality Coalition",
    "Energy In Depth",
    "Energy Intensive Users Group (EIUG)",
    "Energy4US",
    "Ethical Oil Institute",
    "European Climate Realist Network",
    "European Institute for Climate and Energy",
    "Federalist Society",
    "Foundation for Accountability and Civic Trust (FACT)",
    "Foundation for Economic Education",
    "Foundation for Independence",
    "Franklin Center for Government and Public Integrity",
    "Fraser Institute",
    "Free Market Environmental Law Clinic",
    "Free Speech in Science Project",
    "Free to Choose Network",
    "Freedom Association",
    "Freedom Foundation of Minnesota",
    "Freedom Partners",
    "FreedomWorks",
    "Friends of Science",
    "Frontier Centre for Public Policy",
    "Frontiers of Freedom",
    "FTI Consulting",
    "Fueling US Forward",
    "Generation Opportunity",
    "George C. Marshall Institute",
    "George Mason University",
    "Global Climate Coalition",
    "Global Vision",
    "Global Warming Policy Foundation",
    "Government Accountability and Oversight",
    "Greening Earth Society",
    "Guido Fawkes",
    "Heartland Institute",
    "Heidelberg Appeal",
    "Heritage Foundation",
    "High Park Group",
    "Hoover Institution on War, Revolution and Peace",
    "Hudson Institute",
    "i360",
    "IceAgeNow",
    "Illinois Coal Association",
    "Illinois Policy Institute",
    "In Pursuit Of",
    "Independence Institute",
    "Independent Committee on Geoethics",
    "Independent Institute",
    "Independent Women’s Forum",
    "Independent Women’s Voice",
    "INEOS",
    "Information Council for the Environment",
    "Initiative for Free Trade",
    "Institute for Energy Research",
    "Institute for Free Enterprise",
    "Institute for Free Speech",
    "Institute for Humane Studies",
    "Institute for Liberty",
    "Institute for Private Enterprise",
    "Institute of Economic Affairs",
    "Institute of Public Affairs",
    "Instituto Juan de Mariana",
    "Instituto Liberdade",
    "Intermountain Rural Electric Association",
    "International Climate and Environmental Change Assessment Project",
    "International Climate Science Coalition",
    "International Policy Network",
    "Irish Climate Science Forum",
    "James Madison Institute",
    "John Birch Society",
    "John Locke Foundation",
    "Judicial Crisis Network",
    "JunkScience.com",
    "Knowledge and Progress Fund",
    "Koch Family Foundations",
    "Lavoisier Group",
    "Leadership Institute",
    "Legatum Institute",
    "Lexington Institute",
    "Liberty Institute",
    "Mackinac Center for Public Policy",
    "Manhattan Institute for Policy Research",
    "Manufacturers’ Accountability Project",
    "Media Intelligence Partners",
    "Media Research Center",
    "Mercatus Center",
    "Mercer Family Foundation",
    "Modern Miracle Network",
    "Mont Pelerin Society",
    "Murray Energy",
    "National Association of Manufacturers",
    "National Black Chamber of Commerce",
    "National Center for Policy Analysis",
    "National Center for Public Policy Research",
    "National Chicken Council",
    "National Mining Association",
    "National Pork Producers Council",
    "Natural Resources Stewardship Project",
    "NERA Economic Consulting",
    "Nevada Policy Research Institute",
    "New Hope Environmental Services",
    "New Zealand Climate Science Coalition",
    "News-watch",
    "Oil and Gas Climate Initiative",
    "Oil and Gas UK",
    "Oregon Institute of Science and Medicine",
    "Oregon Petition",
    "Pacific Research Institute",
    "Partnership for Energy Progress",
    "Philanthropy Roundtable",
    "Council for National Policy",
    "Politeia",
    "Power the Future",
    "PragerU",
    "Principia Scientific International",
    "Property and Environment Research Center",
    "Public First",
    "Reaching America",
    "Reason Foundation",
    "Renewable Energy Foundation",
    "Scaife Family Foundations",
    "Science and Environmental Policy Project",
    "Science and Public Policy Institute",
    "Seminar Network",
    "Siccar Point Energy",
    "Spiked",
    "Stand Together",
    "State Policy Network",
    "Statistical Assessment Service",
    "Talent Market",
    "TaxPayers’ Alliance",
    "TCW Defending Freedom (formerly The Conservative Woman)",
    "Tech Central Station",
    "Texas Public Policy Foundation",
    "The Advancement of Sound Science Coalition",
    "The Daily Caller",
    "The Empowerment Alliance",
    "The Galileo Movement",
    "Third Energy",
    "Thomas Jefferson Institute for Public Policy",
    "Transportation Fairness Alliance",
    "Trees of Liberty",
    "TSAugust",
    "Turning Point USA",
    "U.S. Grains Council",
    "University of Buckingham",
    "US Chamber of Commerce",
    "VA-SEEE",
    "Virginia Institute for Public Policy",
    "Washington Coal Club",
    "Washington Legal Foundation",
    "Western Energy Alliance",
    "Western Fuels Association",
    "Western States Petroleum Association",
    "World Climate Report",
    "Your Energy America",
];

const scrape = async (url) => {
    console.log("SCRAPING");
    console.log(url);
    const response = await axios.get(url);
    const data = {};
    if (url.includes("oup.com")) {
        const $ = cheerio.load(response.data);
        const title = $("h1.wi-article-title").text().trim();
        const journalTitle = $(".ww-citation-primary")
            .find("em:first-of-type")
            .text()
            .trim();
        const acknowledgements = $("h2")
            .toArray()
            .filter((o) => $(o).text() === "Funding")
            .map((o) => $(o).next("p").text())[0]
            ?.trim();
        data.url = url;
        data.acknowledgements = acknowledgements;
        data.title = title;
        data.journalTitle = journalTitle.trim();
    } else if (url.includes("sciencedirect.com")) {
        console.log("SCIENCE DIRECT");
        const $ = cheerio.load(response.data);
        const title = $(".title-text").text().trim();
        const journalTitle = $("a.publication-title-link").text().trim();
        const acknowledgements = $("h2")
            .toArray()
            .filter((o) => $(o).text() === "Funding")
            .map((o) => $(o).next("p").text())[0]
            ?.trim();
        data.title = title;
        data.acknowledgements = acknowledgements;
        data.journalTitle = journalTitle;
    } else if (url.includes("plos.org")) {
        console.log("PLOS");
        const $ = cheerio.load(response.data);
        const title = $("#artTitle").text().trim();
        const journalTitle = $("h1.logo").text().trim();
        const acknowledgements = $(".articleinfo")
            .find("strong")
            .toArray()
            .filter((o) => $(o).text().includes("Funding"))
            .map((o) => $(o).parent("p").text())[0]
            ?.replace("Funding: ", "")
            .trim();
        data.title = title;
        data.acknowledgements = acknowledgements;
        data.journalTitle = journalTitle;
    } else if (url.includes("springer.com")) {
        console.log("SPRINGER");
        const $ = cheerio.load(response.data);
        const title = $(".c-article-title").text().trim();
        const journalTitle = $("i[data-test=journal-title]").text().trim();
        const acknowledgements = $("h2")
            .toArray()
            .filter((o) => $(o).text().includes("Acknowledgments"))
            .map((o) =>
                $(o)
                    .next(".c-article-section__content")
                    .find("p:first-child")
                    .text()
            )[0]
            ?.trim();
        data.title = title;
        data.journalTitle = journalTitle;
        data.acknowledgements = acknowledgements;
    } else if (url.includes("nature.com")) {
        console.log("NATURE");
        const $ = cheerio.load(response.data);
        const title = $(".c-article-title").text().trim();
        const journalTitle = $("i[data-test=journal-title]").text().trim();
        const acknowledgements = $("h2")
            .toArray()
            .filter((o) => $(o).text().includes("Acknowledgements"))
            .map((o) =>
                $(o)
                    .next(".c-article-section__content")
                    .find("p:first-child")
                    .text()
            )[0]
            ?.trim();
        console.log(acknowledgements);
        data.title = title;
        data.journalTitle = journalTitle;
        data.acknowledgements = acknowledgements;
    }
    if (Object.keys(data).length) {
        if (data.acknowledgements) {
            const detectEntitiesCommand = new BatchDetectEntitiesCommand({
                LanguageCode: "en",
                TextList: [data.acknowledgements],
            });
            const response = await client.send(detectEntitiesCommand);
            const entities = response?.ResultList[0].Entities.reduce(
                (acc, current) => {
                    if (
                        !acc.some((o) => o.name === current.Text) &&
                        current.Score >= 0.8 &&
                        current.Type === "ORGANIZATION"
                    ) {
                        acc.push({
                            name: current.Text,
                            isDisinformationOrganisation: desmogOrgs
                                .map((s) => s.toLowerCase())
                                .includes(current.Text.toLowerCase()),
                        });
                        return acc;
                    }
                    return acc;
                },
                []
            );
            data.organisations = entities;
        }
        if (data.journalTitle) {
            data.journalImpact = rankings.find(
                (o) =>
                    o.title.includes(data.journalTitle.toLowerCase()) ||
                    data.journalTitle.toLowerCase().includes(o.title)
            )?.impact;
        }
        return data;
    }
    return false;
};

app.get("/", (req, res) => {
    res.send("Hello world!");
});

app.get("/article", cors(), async (req, res) => {
    if (!req.query.url) {
        return res.send("Enter a URL");
    }
    console.log(req.query.url);
    const data = await scrape(req.query.url);
    console.log(data);
    res.json(data);
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
