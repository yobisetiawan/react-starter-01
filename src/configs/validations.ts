const validations = {
    required: { required: "This input is required." },
    getMessage: (errors: any, field: string) => {
        if (errors[field]?.message) {
            return errors[field]?.message;
        }
        return undefined;
    }
}

export default validations;