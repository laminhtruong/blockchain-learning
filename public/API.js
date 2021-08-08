class API
{
    constructor()
    {
        this.API_URL = 'http://localhost:3456';
    }

    /**
     *
     * @param {String} method
     * @param {String} path
     * @param {String} body
     * @param {string} token
     * @returns
     */
    Request(method, path, body)
    {
        return new Promise((resolve, reject) =>
        {
            let xhr = new XMLHttpRequest();
            xhr.open(method, this.API_URL + path, true);

            xhr.setRequestHeader("Content-type", "application/json");
            xhr.onreadystatechange = () =>
            {
                if (xhr.readyState == 4)
                {
                    if (xhr.status == 200)
                    {
                        resolve(xhr.response);
                    }
                    else
                    {
                        reject(xhr.response);
                    }
                }
            };
            xhr.send(body);
        });
    }

   /**
    *
    * @param {string} email
    * @param {string} name
    * @param {string} wallet
    * @returns user profile
    */
    Register(email, name, wallet)
    {
        let body = {
            email,
            name,
            wallet
        };
        return this.Request('post', '/register', JSON.stringify(body));
    }
}