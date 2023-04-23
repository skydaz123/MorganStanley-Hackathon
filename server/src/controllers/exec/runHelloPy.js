import { exec } from "child_process"

export default async function runHelloPy() {
    console.log("something")
    exec("python3 ./hello.py", (error, stdout, stderr) => {
        // if (error) {
        //   console.error(exec error: ${error});
        //   return;
        // }
        console.log(stdout)
        console.log(error)
        // console.log(stderr);
    })
}
