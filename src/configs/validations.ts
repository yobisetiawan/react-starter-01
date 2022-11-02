import { toaster } from "evergreen-ui";

const validations = {
    required: { required: "This input is required." },
    getMessage: (errors: any, field: string) => {
        if (errors[field]?.message) {
            return errors[field]?.message;
        }
        return undefined;
    },
    setServerError: (err: any, formDt?: any, setError?: undefined | ((key: any, params: any) => void)) => {
        toaster.danger(err?.response?.data?.message ?? err?.message);
        if (formDt) {
            Object.keys(formDt).forEach(function (key) {
                let v = err?.response?.data?.errors ?? [];
                if (v[key]) {
                    if (typeof setError !== 'undefined') {
                        setError(key, {
                            type: "custom",
                            message: v[key].join(", "),
                        });
                    }
                }
            });
        }

    }
}

export default validations;