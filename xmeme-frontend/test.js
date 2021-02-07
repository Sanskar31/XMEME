const axios = require('axios');

for (let i = 0; i < 10000; ++i) {
    let url = `url ${i}`;
    const data = {
        name: 'Mr. Script',
        caption: 'random()',
        url: url,
    };
    axios
        .post('http://localhost:8081/memes/', data)
        .then((res) => {
            // console.log(res.status);
            if (res.status !== 201) {
                console.log(`Request ${i} failed`);
            }
        })
        .catch(function (error) {
            console.log(error);
        });
}
