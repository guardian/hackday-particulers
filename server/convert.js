import fs from "fs";

const json = JSON.parse(
    fs.readFileSync(new URL("./rankings.json", import.meta.url))
);

const fixed = json.map((o) => ({
    rank: o.Rank,
    title: o["Full Journal Title"].toLowerCase(),
    impact: o["Journal Impact Factor"],
}));

const asString = JSON.stringify(fixed);

fs.writeFile("./rankings2.json", asString, () => {});

console.log(fixed[0]);
