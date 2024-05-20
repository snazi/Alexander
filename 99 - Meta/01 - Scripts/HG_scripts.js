async function get_name_and_date(tp) {
    const currentDate = moment().format('MMM DD, YYYY'); 
    const file_name = "HG Coaching " + currentDate
    await tp.file.rename(file_name)

    return ""
}

module.exports = get_name_and_date;