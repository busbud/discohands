const moment = require("moment");

function IdentityFilter() {
    return function identityFilter(where) {
        return where;
    }
}

function OmitStaleFilter(max_age) {
    return function omitStaleFilter(where) {
        const threshold = moment().subtract(max_age, "days");

        return Object.assign({ date: { $gte: threshold.toDate() } }, where);
    }
}

function FilterFactory() {
    const MAXIMUM_TOPIC_AGE_DAYS = parseInt(process.env.MAXIMUM_TOPIC_AGE_DAYS, 10);

    if (MAXIMUM_TOPIC_AGE_DAYS > 0) {
        return OmitStaleFilter(MAXIMUM_TOPIC_AGE_DAYS);
    }

    return IdentityFilter();
}

module.exports = FilterFactory;