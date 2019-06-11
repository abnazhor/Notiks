exports.createStyleSheet = function () {
    let fs = require("fs");

    const LOAD_CATEGORIES = "SELECT * from categories;";
    con.query(LOAD_CATEGORIES, (err, result) => {
        try {
            if (err) throw err;
            let stylesheetResult = "";

            for (let i = 0; i < result.length; i++) {
                let header = `.${result[i].categ_id} {\n`;
                let body = "";
                let style_lines = result[i].style.split(";");
                let footer = "}\n";
                for (let j = 0; j < style_lines.length; j++) {
                    if (style_lines[j] != "") {
                        body += "\t" + style_lines[j] + ";";
                        if (j < style_lines.length - 1) {
                            body += "\n";
                        }
                    }
                }

                stylesheetResult += header;
                stylesheetResult += body;
                stylesheetResult += footer;
            }

            fs.writeFileSync("./views/board/categories.css", stylesheetResult);
        } catch (err) {
            console.log("WARNING: Database doesn't have all the tables. Some features might not work correctly.");
        }
    });
};