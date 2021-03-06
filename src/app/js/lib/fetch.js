import fetch from 'fetch-with-proxy';

import { getHost } from '../../../common/uris';

export default ({ url, ...config }, mode = 'json') => {
    const fullUrl = url.startsWith('http') ? url : getHost() + url;
    return fetch(fullUrl, config).then(
        response => {
            if (response.status === 204) {
                return { response: null };
            }
            if (response.status >= 200 && response.status < 300) {
                if (mode === 'blob') {
                    const filename = response.headers.get("content-disposition").match(/filename\*?=['"]?(?:UTF-\d['"]*)?([^;\r\n"']*)['"]?;?/).slice(1, 2);
                    return response.blob().then(blob => ({ response: blob, filename }));
                }

                return response
                    .json()
                    .then(json => ({ response: json }))
                    .catch(error => ({ error }));
            }

            return response.json().then(
                json => {
                    const error = new Error(json.error);
                    error.response = response;
                    error.code = response.status;
                    return { error };
                },
                () => {
                    const error = new Error(response.statusText);
                    error.response = response;
                    error.code = response.status;
                    return { error };
                },
            );
        },
        error => ({ error }),
    );
};
