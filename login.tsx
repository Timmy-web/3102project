import { useState } from 'react';
import { enc, SHA256 } from 'crypto-js';
type User = {
    Username: string
    Password: string;
    isHSUStudent: string;
    StudentID: string;
    Program: string;
    Entrance_year: string;
    Last_Login: string;
}
type Login = {
    LoginUser: string;
    LoginPassword: string;
}



const Login: React.FC = function () {
    const [data, setData] = useState<User>({ Username: '', Password: '', isHSUStudent: '', StudentID: '', Program: '', Entrance_year: '', Last_Login: 'Never' });
    const [log, setStatus] = useState<Login>({ LoginUser: '', LoginPassword: '' });
    var data_arr = new Array();
    function register() {
        const read = localStorage.getItem('data');
        var isExist: boolean = false;
        if (read) {
            const obj = JSON.parse(read) as User;
            for (const i in obj) {
                data_arr[i] = obj[i]
                if (data.Username == data_arr[i].Username) {
                    isExist = true;
                }
            }
            if (data.isHSUStudent == "") {
                alert("You miss some field")
            } else if (data.isHSUStudent == "true") {
                if (data.StudentID == '' || data.Password == '' || data.Program == '' || data.Entrance_year == '') {
                    alert("You miss some field")
                } else if (isExist) {
                    alert("Username is exist")
                } else {
                    data.Password = enc.Hex.stringify(SHA256(data.Password))
                    data_arr.push(data)
                    localStorage.setItem('data', JSON.stringify(data_arr));
                    alert("Your account has been created")
                }
            } else if (data.isHSUStudent == "false") {
                if (data.Username == '' || data.Password == '') {
                    alert("You miss some field")
                } else if (isExist) {
                    alert("Username is exist")
                } else {
                    data.Password = enc.Hex.stringify(SHA256(data.Password))
                    data_arr.push({ Username: data.Username, Password: data.Password, isHSUStudent: data.isHSUStudent, Last_Login: data.Last_Login })
                    localStorage.setItem('data', JSON.stringify(data_arr));
                    alert("Your account has been created")
                }
            }
        } else {
            if (data.isHSUStudent == "") {
                alert("You miss some field")
            }
            if (data.isHSUStudent == "true") {
                if (data.StudentID == '' || data.Password == '' || data.Program == '' || data.Entrance_year == '') {
                    alert("You miss some field")
                } else {
                    data.Password = enc.Hex.stringify(SHA256(data.Password))
                    data_arr.push(data)
                    localStorage.setItem('data', JSON.stringify(data_arr));
                    alert("Your account has been created")
                }
            } else if (data.isHSUStudent == "false") {
                if (data.Username == '' || data.Password == '') {
                    alert("You miss some field")
                } else {
                    data.Password = enc.Hex.stringify(SHA256(data.Password))
                    data_arr.push({ Username: data.Username, Password: data.Password, isHSUStudent: data.isHSUStudent, Last_Login: data.Last_Login })
                    localStorage.setItem('data', JSON.stringify(data_arr));
                    alert("Your account has been created")
                }
            }
        }

    }
    function login() {
        const read = localStorage.getItem('data');
        var isLogin: boolean = false;
        if (read) {
            const obj = JSON.parse(read) as User;
            for (var i = 0; i < JSON.parse(read).length; i++) {
                if (obj[i].Username == log.LoginUser && obj[i].Password == enc.Hex.stringify(SHA256(log.LoginPassword))) {
                    var logtime: string = new Date().toTimeString();
                    var status = { UserInfo: obj[i], LoginTime: logtime }
                    localStorage.setItem('status', JSON.stringify(status));
                    obj[i].Last_Login = logtime;
                    alert("Login successfully")
                    isLogin = true;
                }
            }
            localStorage.setItem('data', JSON.stringify(obj));
            if (isLogin == false) {
                alert("Username or password invalid")
            }
        } else {
            alert("User not found")
        }
    }
    function clear() {//for you to clear the data
        localStorage.removeItem('data');
        data_arr = [];
        console.log('Data is cleared');
    }

    return (
        <div>
            <div className="register">
                Username: <input value={data.Username} onChange={x => setData({ ...data, Username: x.target.value })} />
                <br />
                Password: <input type="password" value={data.Password} onChange={x => setData({ ...data, Password: x.target.value })} />
                <br />
                Are you study in HSU?:
                <label><input type="radio" name="isHSUStudent" value="true" onChange={x => setData({ ...data, isHSUStudent: x.target.value })} />Yes</label>
                <label><input type="radio" name="isHSUStudent" value="false" onChange={x => setData({ ...data, isHSUStudent: x.target.value })} />No</label>
                <br />
                {data.isHSUStudent == "true" &&
                    <div>Student ID: <input value={data.StudentID} onChange={x => setData({ ...data, StudentID: x.target.value })} />
                        <br />
                        Programme of the student: <input value={data.Program} onChange={x => setData({ ...data, Program: x.target.value })} />
                        <br />
                        Year of entrance: <input value={data.Entrance_year} onChange={x => setData({ ...data, Entrance_year: x.target.value })} />
                        <br /></div>}
                <button onClick={register}>Sign Up</button>
                <button onClick={clear}>Clear local storage</button>
            </div>
            <div className="login">
                Username: <input value={log.LoginUser} onChange={x => setStatus({ ...log, LoginUser: x.target.value })} />
                <br />
                Password: <input type="password" value={log.LoginPassword} onChange={x => setStatus({ ...log, LoginPassword: x.target.value })} />
                <br />
                <button onClick={login}>Sign In</button>
            </div>
        </div>
    );
};

export default Login;
