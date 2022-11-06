import { defaultTheme, mergeTheme } from "evergreen-ui";

export const theme = mergeTheme(defaultTheme, {
    components: {
        Button: {
            appearances: {
                app_btn: {
                    color: 'white',

                    backgroundColor: '#343434',

                    _disabled: {
                        backgroundColor: '#dddddd',
                    },

                    _focus: {
                        boxShadow: '0 0 0 2px #dddddd',

                    },

                },
            },
        },

        Input: {

            appearances: {
                default: {
                    _focus: {
                        boxShadow: '0 0 0 2px #ddd',
                        borderColor: '#ddd'
                    }
                }
            }
        },

        Checkbox: {
            appearances: {
                default: {
                    _checkedActive: {
                        backgroundColor: '#343434'
                    },
                    _checkedHover: {
                        backgroundColor: '#343434'
                    },
                    _checked: {
                        backgroundColor: '#343434'
                    }
                }
            }
        },

        Radio: {
            appearances: {
                default: {
                    _checkedActive: {
                        backgroundColor: '#343434'
                    },
                    _checkedHover: {
                        backgroundColor: '#343434'
                    },
                    _checked: {
                        backgroundColor: '#343434'
                    }
                }
            }
        },

        Switch: {
            appearances: {
                default: {
                    _checkedActive: {
                        backgroundColor: '#343434'
                    },
                    _checkedHover: {
                        backgroundColor: '#343434'
                    },
                    _checked: {
                        backgroundColor: '#343434'
                    }
                }
            }
        },

        TagInput: {
            appearances: {
                default: {
                    _focused: {
                        boxShadow: '0 0 0 2px #ddd',
                        borderColor: '#ddd'
                    }
                }
            }
        },



    }

})
