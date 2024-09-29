const jwt = require('jsonwebtoken');
const zod = require('zod');
const jwtPassword = 'secret';

const emailSchema = zod.string().email();
const passwordSchema = zod.string().min(6);


function signJwt(username, password) {
    const userResponse = emailSchema.safeParse(username);
    const passResponse = passwordSchema.safeParse(password);

    if (!(userResponse.success && passResponse.success)) {
        return {
            success: false,
            message: 'Invalid username or password'
        };
    }
    const payload = {
        username: userResponse.data,
        password: passResponse.data,
    }
    return jwt.sign(payload, jwtPassword);
}

// console.log(signJwt('test@gmail.com', 'qwerty'))

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3RAZ21haWwuY29tIiwicGFzc3dvcmQiOiJxd2VydHkiLCJpYXQiOjE3Mjc2MzIxMzJ9.TmL9TRgN82UjDQ6lngKNTd6gvft1ssIBSE6-32G-owY


function verifyJwt(token) {
    try {
        const verifier = jwt.verify(token, jwtPassword);
        return verifier;
    } catch (error) {
        return false;
    }
}

const test1 = verifyJwt("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3RAZ21haWwuY29tIiwicGFzc3dvcmQiOiJxd2VydHkiLCJpYXQiOjE3Mjc2MzIxMzJ9.TmL9TRgN82UjDQ6lngKNTd6gvft1ssIBSE6-32G-owY");

console.log(test1)


function decodeJwt(token) {
    const decoded = jwt.decode(token);
    if (decoded) {
        return true;
    }
    return false;
}

const test = decodeJwt("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3RAZ21haWwuY29tIiwicGFzc3dvcmQiOiJxd2VydHkiLCJpYXQiOjE3Mjc2MzIxMzJ9.TmL9TRgN82UjDQ6lngKNTd6gvft1ssIBSE6-32G-owY");

console.log(test)