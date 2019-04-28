/**
 * Created by DDT on 2019/4/10.
 */
const autoprefixer = require('autoprefixer');

module.exports = {
    plugins: [
        autoprefixer({ cascade: false })
    ]
};