const { booklist,book } = require('../../models')

exports.addBookList = async (req, res) => {
    try {
        let userId = req.user.id;
        let bookId = req.body;
        await booklist.create({...bookId,userId})
        res.send({
            status: 'success',
            message: 'Add book list success',
            userId,
            bookId
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
        const id = req.user.id;

        // const data = await bookList.findAll({
        //     where: {
        //         userId : id
        //     },
        //     attributes: {
        //         exclude: ['createdAt', 'updatedAt']
        //     }
        // })

let data = await booklist.findAll({
      include: 
        {
          model: book,
          as: "book",
          attributes: {
            exclude: ["createdAt", "updatedAt", "password"]
          },
        },
        attributes: {
        exclude: ["createdAt", "updatedAt","id"]
      },
     });
   data = JSON.parse(JSON.stringify(data));
   data = data.map((item) => {
      return { id : item.bookId ,
            cover: process.env.FILE_PATH + item.book.cover,
            title : item.book.title,
            author : item.book.author
            };
    });

        res.send({
            status: 'success',
            data
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