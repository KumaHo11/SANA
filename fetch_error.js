const http = require('http');

http.get('http://localhost:3000/users/new', (res) => {
    let data = '';
    res.on('data', (chunk) => {
        data += chunk;
    });
    res.on('end', () => {
        console.log("STATUS CODE:", res.statusCode);
        if (res.statusCode === 500) {
            // Extract the error message from the NextJS HTML
            const match = data.match(/<title>(.*?)<\/title>/);
            console.log("TITLE:", match ? match[1] : "No title");

            // Sometime it's in a specific div
            const matchError = data.match(/data-nextjs-dialog-header="true"[^>]*>([^<]+)/);
            console.log("ERROR HEADER:", matchError ? matchError[1] : "No header");

            const content = data.replace(/<[^>]+>/g, ' ').substring(0, 2000);
            console.log("CONTENT:", content);
        }
    });
}).on("error", (err) => {
    console.log("Error: " + err.message);
});
