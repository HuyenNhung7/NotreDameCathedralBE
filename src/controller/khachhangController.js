import KH from '../models/khachhang.js'
import jwt from 'jsonwebtoken'
import KhachHang from '../models/khachhang.js'

export const getMe = async (req, res) => {
    try {
        res.send({ user: req.KhachHang })
    } catch (e) {
        res.status(500).send(e)
    }
}

export const findById = async (req, res) => {
    const { id } = req.params;
    try {
        const KhachHang = await KH.findById(id);
        if (!KhachHang) {
            return res.status(404).send("Not found");
        }
        else {
            res.send(KhachHang);
        }
    } catch (e) {
        res.status(500).send(e)
    }
}

export const getAllKH = async (req, res) => {
    try {
        const limit = parseInt(req.query.pageSize) || 4;
        const skip = (parseInt(req.query.page) - 1) * limit || 0;
        let filter = {}
        if (req.query.username) {
            filter.hoten = { "$regex": '.*' + req.query.username + '.*', "$options": 'i' };
        }
        const listKH = await KH.find(filter).skip(skip).limit(limit);
        console.log(listKH);
        const totalKH = (await KH.find(filter)).length;
        const size = Math.ceil(totalKH / limit);
        res.send({ size, totalKH, listKH });
    } catch (e) {
        res.status(500).send(e)
    }

}


export const addKH = async (req, res) => {
    const kh = new KH(req.body)
    try {
        if (await (await KH.find({})).length !== 0) {

            const KHLast = await (await KH.find({})).splice(-1)
            const maKHLast = await KHLast[0].makh.substring(2) || "0"
            const newmaKH = "KH" + Number(Number(maKHLast) + 1)
            kh.makh = newmaKH
        
        }
        const token = await kh.generateAuToken()
        await kh.save()
        res.status(201).send({ kh, token })

    } catch (e) {
        res.status(500).send(e)
    }
}

export const login = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const findKH = await KH.findOne({ email }).select("+password");
        if (findKH && await findKH.isPasswordMatched(password)) {
            const token = await findKH.generateAuToken();
            res.send({ findKH, token });
        } else {
            throw new Error('Unable to login');
        }
    }

    catch (e) {
        res.status(400).send({ message: e.message })
    }
}


export const forgotPassword = async (req, res) => {
    try {
        const email = req.body.email
        const user = await KH.findOne({ email: email })
        if (!user) {
            return res.status(404).send("Email not exists")
        }
        const token = jwt.sign({ _id: user._id.toString(), name: user.name }, "ewewe23124113", { expiresIn: '20m' })
        user.verifyToken = token
        await user.save()
      
        const mailOptions = {
            from: "tibutibu39@gmail.com",
            to: email,
            subject: "Sending Email For password Reset",
            text: `This Link Valid For 20 MINUTES http://localhost:3000/resetpass/${user.id}/${user.verifyToken}`
        }
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log("error", error);
                res.status(401).json({ status: 401, message: "email not send" })
            } else {
                console.log("Email sent", info.response);
                res.status(201).json({ status: 201, message: "Email sent Successfully" })
            }
        })

        return res.send({
            message: `Đã gửi thành công cho ${email}`
        })
    } catch (e) {
        res.status(500).send(e)
    }
}

export const resetPassword = async (req, res) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decode = jwt.verify(token, "ewewe23124113")
        if (!decode) {
            throw new Error("Token is expired or wrong")
        }
        const user = await KH.findOne({ _id: decode._id, verifyToken: token })
        if (!user) {
            return res.status(400).send("User not exist")
        }
        user.password = req.body.password
        await user.save()
        res.status(200).send(user)
    } catch (e) {
        res.status(500).send(e.message)
    }
}


export const ChangePassword = async (req, res) => {
    try {
        const { id } = req.params;
        const { oldPassword, newPassword } = req.body;
        const user = await KH.findById(id).select("+password");
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }


        if (user.password) {
            const isMatched = await user.isPasswordMatched(oldPassword);
            console.log(isMatched);
            if (!isMatched) {
                console.log(isMatched);
                return res.status(400).json({ message: 'Old password is incorrect' });
            }
        }


        if (newPassword.length < 8) {
            return res.status(400).json({ message: 'Password must be at least 8 characters long' });
        }
        user.password = newPassword;
        await user.save();

        res.json({ message: 'Password changed successfully' });
    } catch (e) {
        res.status(500).send(e.message)
    }
}








// sửa thông tin khách hàng
export const updateKH = async (req, res) => {
    const updates = Object.keys(req.body)
    const allowUpdates = ["hoten", "email", "gioitinh", "ngaysinh", "sdt", "diachi", "cccd"]
    const isValidOperation = updates.every((update) => {
        return allowUpdates.includes(update)
    })
    if (!isValidOperation) {
        return res.status(400).send("error: Invalid updates!")
    }

    try {
        console.log(req.body)
        const khs = await KhachHang.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true })
        if (!khs) {
            return res.status(404).send('Not found!')
        }
        else {
            res.json(khs)
            console.log(khs)
        }
    } catch (error) {
        res.status(500).send(error)
    }

}














