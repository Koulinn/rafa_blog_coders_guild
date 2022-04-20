const getWriter = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        req.author = WRITERS.find((author) => author.code === token)
        if (req.author) {
            next()
        } else {
            res.status(403).send({
                success: false,
                msg: 'Forbidden'
            })
        }
    } catch (error) {
        next()
    }
}

const WRITERS = [
    {
        name: 'Rafa Lima',
        avatar: 'https://res.cloudinary.com/koulin/image/upload/v1649490636/New%20portfolio/Blog-ts/assets/me_qm7foz.jpg',
        code: 'lksdfdslkoi456845u78943gDFSFHYT$£$REeds'
    }
]

export default getWriter
