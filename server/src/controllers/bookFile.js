const { book } = require('../../models')
exports.updateBookFile = async (req, res) => {
    try {
        const { id } = req.params
        const bookFile = req.file.filename;
        await book.update({bookFile}, {
            where : {id}
        })
        res.send({
            status: 'success',
            message: 'Book File Uploaded',
            data :{
            book :{
            bookFile 
            },
            }
        })
    } catch (error) {
        console.log(error)
        res.send({
            status: 'failed',
            message: 'Server Error'
        })
    }
}
