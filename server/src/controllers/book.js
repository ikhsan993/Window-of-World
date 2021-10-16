const { book } = require('../../models')

exports.addBook = async (req,res) => {
    try {

        const cover = req.file.filename;
        const data = req.body;
        await book.create({...data,cover})
        res.send({
            status: 'success',
            message: 'Add book success',
            data :{
            book :{
              ...data,
            cover 
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

exports.getBooks = async (req, res) => {
    try {

        let books = await book.findAll({
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        })
    // why this work without  stringify?
    books = JSON.parse(JSON.stringify(books));    
    books = books.map(item=>{return {
        ...item,
        cover : process.env.FILE_PATH + item.cover, 
        }
    })
        res.send({
            status: 'success',
            data: {
                books
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

exports.getBook = async (req, res) => {
    try {
        const { id } = req.params
        let data = await book.findOne({
            where: {
                id
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        })
        data = JSON.parse(JSON.stringify(data));  
        data = {...data,
                cover : process.env.FILE_PATH + data.cover,
                bookFile : process.env.FILE_PATH + data.bookFile,
            }
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

exports.updateBook = async (req, res) => {
    try {
        const { id } = req.params
        const cover = req.file.filename;
        const data = req.body;
        const updatedData = {...data,cover}
        await book.update({...data,cover}, {
            where : {id}
        })
        res.send({
            status: 'success',
            message: 'Add book success',
            data :{
            book :{
              ...data,
            cover 
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


exports.deleteBook = async (req, res) => {
    try {
        const { id } = req.params
        await book.destroy({
            where: {
                id
            }
        })

        res.send({
            status: 'success',
            data :{
                id
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