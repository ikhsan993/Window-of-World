const { bookList } = require('../../models')

exports.addBookList = async (req, res) => {
    try {

        await bookList.create(req.body)

        res.send({
            status: 'success',
            message: 'Add book list success'
        })
    } catch (error) {
        console.log(error)
        res.send({
            status: 'failed',
            message: 'Server Error'
        })
    }
}

exports.getBookList = async (req, res) => {
    try {
        const { id } = req.params

        const data = await bookList.findAll({
            where: {
                userId : id
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        })

        res.send({
            status: 'success',
            data: {
                book: data
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

exports.deleteBookList = async (req, res) => {
    try {
        const { id } = req.params

        await bookList.destroy({
            where: {
                id
            }
        })

        res.send({
            status: 'success',
            message: `Book id: ${id} has been deleted from list`
        })
    } catch (error) {
        console.log(error)
        res.send({
            status: 'failed',
            message: 'Server Error'
        })
    }
}