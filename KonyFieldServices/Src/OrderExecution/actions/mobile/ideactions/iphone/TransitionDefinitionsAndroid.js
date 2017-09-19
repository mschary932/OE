var initAndroidTransitions = function() {
        try {
            flowTransitions = {
                "#DEFINED": true,
                "DEFAULT_FORWARD_TRANSITION": {
                    "out": {
                        "formAnimation": 5
                    },
                    "in": {
                        "formAnimation": 3
                    }
                },
                "DEFAULT_BACKWARD_TRANSITION": {
                    "out": {
                        "formAnimation": 4
                    },
                    "in": {
                        "formAnimation": 2
                    }
                },
                "POPUP_DEFAULT_TRANSITION": {
                    "out": {
                        "animation": 10
                    },
                    "in": {
                        "animation": 1
                    }
                },
                "btnCompleteKA": {
                    "out": {
                        "formAnimation": 0
                    },
                    "in": {
                        "formAnimation": 1
                    }
                },
                "frmFirstLoginVA": {
                    "out": {
                        "animation": 0
                    },
                    "in": {
                        "animation": 6
                    }
                },
                "btnLogoutKA": {
                    "out": {
                        "formAnimation": 4
                    },
                    "in": {
                        "formAnimation": 2
                    }
                },
                "btnAddVA": {
                    "out": {
                        "formAnimation": 0
                    },
                    "in": {
                        "formAnimation": 1
                    }
                },
                "btnBack": {
                    "out": {
                        "animation": 6
                    },
                    "in": {
                        "animation": 6
                    }
                },
                "btnCros": {
                    "out": {
                        "animation": 6
                    },
                    "in": {
                        "animation": 6
                    }
                },
                "frmStartUpVA": {
                    "out": {
                        "animation": 6
                    },
                    "in": {
                        "animation": 6
                    }
                },
                "frmLoginVA": {
                    "vbxInfoVA": {
                        "out": {
                            "formAnimation": 12
                        },
                        "in": {
                            "formAnimation": 11
                        }
                    }
                },
                "frmAppInfoVA": {
                    "segAppInfoVA": {
                        "out": {
                            "animation": 6
                        },
                        "in": {
                            "animation": 6
                        }
                    }
                },
                "InfoToLogin": {
                    "out": {
                        "formAnimation": 11
                    },
                    "in": {
                        "formAnimation": 12
                    }
                },
                "segAssetListVA": {
                    "out": {
                        "animation": 0
                    },
                    "in": {
                        "animation": 0
                    }
                },
                "List1ToList2": {
                    "out": {
                        "animation": 0
                    },
                    "in": {
                        "animation": 2
                    }
                },
                "List2ToList1": {
                    "out": {
                        "animation": 4
                    },
                    "in": {
                        "animation": 0
                    }
                },
                "ListToDetail": {
                    "out": {
                        "formAnimation": 0
                    },
                    "in": {
                        "formAnimation": 2
                    }
                },
                "DetailToList": {
                    "out": {
                        "animation": 4
                    },
                    "in": {
                        "animation": 0
                    }
                },
                "DetailToTask": {
                    "out": {
                        "formAnimation": 0
                    },
                    "in": {
                        "formAnimation": 1
                    }
                },
                "TaskToDetail": {
                    "out": {
                        "formAnimation": 10
                    },
                    "in": {
                        "formAnimation": 0
                    }
                },
                "ListToAdd": {
                    "out": {
                        "formAnimation": 0
                    },
                    "in": {
                        "formAnimation": 1
                    }
                },
                "AddToList": {
                    "out": {
                        "formAnimation": 10
                    },
                    "in": {
                        "formAnimation": 0
                    }
                },
                "ToEdit": {
                    "out": {
                        "formAnimation": 0
                    },
                    "in": {
                        "formAnimation": 1
                    }
                },
                "FromEdit": {
                    "out": {
                        "formAnimation": 10
                    },
                    "in": {
                        "formAnimation": 0
                    }
                },
                "InspectionToAsset": {
                    "out": {
                        "animation": 6
                    },
                    "in": {
                        "animation": 6
                    }
                },
                "AssetToInspection": {
                    "out": {
                        "animation": 6
                    },
                    "in": {
                        "animation": 6
                    }
                },
                "InFormVisibilityChange": {
                    "out": {
                        "animation": 6
                    },
                    "in": {
                        "animation": 6
                    }
                },
                "ViewChange": {
                    "out": {
                        "formAnimation": 11
                    },
                    "in": {
                        "formAnimation": 11
                    }
                },
                "SegAppMenuVA": {
                    "out": {
                        "formAnimation": 0
                    },
                    "in": {
                        "formAnimation": 2
                    }
                },
                "Step1ToStep2": {
                    "out": {
                        "formAnimation": 6
                    },
                    "in": {
                        "formAnimation": 6
                    }
                },
                "Step2ToStep1": {
                    "out": {
                        "formAnimation": 6
                    },
                    "in": {
                        "formAnimation": 6
                    }
                },
                "ListOfAssets": {
                    "out": {
                        "animation": 6
                    },
                    "in": {
                        "animation": 6
                    }
                },
                "btnLogoutVA": {
                    "out": {
                        "animation": 6
                    },
                    "in": {
                        "animation": 6
                    }
                }
            };
            return flowTransitions;
        } catch (err) {
            kony.print("Exception in initAndroidTransitions:" + JSON.stringify(exception));
        }
    }