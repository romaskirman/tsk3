import express from "express";
const app = express();

const PORT = process.env.PORT || 3000;

// gcd function (BigInt safe)
function gcd(a, b) {
    while (b !== 0n) {
        let temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}

// lcm function
function lcm(a, b) {
    return (a * b) / gcd(a, b);
}

// validation helper
function isValidNumber(n) {
    return typeof n === "bigint";
}

app.get("/:email", (req, res) => {
    let email = req.params.email;
    let x = req.query.x;
    let y = req.query.y;

    // convert to BigInt safely
    let numX = Number(x);
    let numY = Number(y);

    // invalid check
    if (
        isNaN(numX) ||
        isNaN(numY) ||
        numX <= 0 ||
        numY <= 0
    ) {
        return res.json("NaN");
    }

    let a = BigInt(numX);
    let b = BigInt(numY);

    let result = lcm(a, b);

    return res.json(result.toString());
});

app.listen(PORT, () => {
    console.log("Server running on port", PORT);
});