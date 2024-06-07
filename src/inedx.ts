// let x: number = 1
// console.log(x)

// function greet(user: string){
//     console.log("HellO "+ user)
// }

// let s: string = "ssaket"
// greet(s);
// greet("saket");

// function sum(v1: number, v2: number){
//     return v1+v2
// }

// console.log(sum(4, 6));

// interface User{
//     f_n: string;
//     l_n: string;
//     age: number;
// }

// function isLegal(user: User){
//     if(user.age>18){
//         return true;
//     } else{
//         return false;
//     }
// }

// function great(userL: User){
//     console.log(`Hello ${userL.f_n} ${userL.l_n}`);
// }

// const x=isLegal({
//     f_n: "saket",
//     l_n: "Pandey",
//     age: 19
// })
// console.log(x)
// great({
//     f_n: "saket",
//     l_n: "Pandey",
//     age: 19
// })


// type tL = {
//     name: string,
//     startDate: Date,
// }

// interface userD {
//     name: string,
//     department: string
// }

// type techLead = tL & userD

// const a: techLead= {
//     name: "saketPandey",
//     startDate: new Date(),
//     department:"asfd"
// }

// console.log(a.startDate)


// enum Directiond {
//     up,
//     down,
//     left,
//     right
// }

// function Patht(kp: Directiond){
//     if(kp==Directiond.down){
//         console.log("true")
//     }
// }

// Patht(Directiond.down)


// function identity<T>(args: T): T {
//     return args
// }

// let output = identity<string>("my string")
// console.log(output)
// let output2 = identity<number>(10)
// console.log(output2)


// interface User {
//     name: string,
//     age: number
// }

// function sumOfAge(user1: User, user2: User){
//     return user1.age + user2.age
// }

// const result = sumOfAge({
//     name: "Saket",
//     age: 19
// }, {
//     name: "Parth",
//     age: 1
// })

// console.log(result)


// interface User {
//     name: string,
//     description: string,
//     age: number,
//     class: string
// }

// type upUser = Pick<User, 'name'|'age'>
// function sumOfAge(user1: upUser, user2: upUser){
//     return user1.age + user2.age
// }

// const result = sumOfAge({
//     name: "Saket",
//     age: 19
// }, {
//     name: "Parth",
//     age: 1
// })

// console.log(result)



// interface User {
//     name: string,
//     description: string,
//     age: number,
//     class: string
// }

// type upUser = Pick<User, 'name'|'age'|'class'>

// type newUser = Partial<upUser>

// function sumOfAge(user1: newUser, user2: newUser){
//     return user1.age + user2.age
// }

// const result = sumOfAge({
//     name: "Saket",
//     age: 19
// }, {
//     name: "Parth",
//     age: 1
// })

// console.log(result)


import {z} from "zod"
import express from "express"

const app = express();

const userProfileSchema = z.object({
    name: z.string().min(1, {message: "Name cannot be empty"}),
    email: z.string().email({message: "Email cannot be empty"}),
    age: z.number().min(18, {message: "you must be atleast 18 years old"}).optional()
})

export type FinalUserSchema = z.infer<typeof userProfileSchema>;

app.put("/", (req, res)=>{
    const {success} = userProfileSchema.safeParse(req.body)
    const updateP:FinalUserSchema = req.body;

    if(!success){
        res.status(411).json({})
        return
    }
    res.json({
        message: "user updated"
    })
});

app.listen(3000);