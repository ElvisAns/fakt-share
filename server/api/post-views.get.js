import { BetaAnalyticsDataClient } from "@google-analytics/data";
import jwt from "jsonwebtoken"

export default defineEventHandler(async (event) => { //shoudbe cached to avoid translating some content and request api
    const auth_token = getCookie(event, "X-API-TOKEN");
    const secret = process.env.AUTH_JWT_SECRET;
    try {
        jwt.verify(auth_token, secret);

        const propertyId = 453626925;

        // Using a default constructor instructs the client to use the credentials
        // specified in GOOGLE_APPLICATION_CREDENTIALS environment variable.
        const analyticsDataClient = new BetaAnalyticsDataClient();
        // Runs a simple report.
        async function runReport() {
            const [response] = await analyticsDataClient.runReport({
                property: `properties/${propertyId}`,
                "dimensions": [
                    {
                        "name": "eventParamValue",
                    },
                    {
                        "name": "eventName",
                    },
                    {
                        "name": "eventParamKey",
                    }
                ],
                "dimensionFilters": [
                    {
                        "filters": [
                            {
                                "fieldName": "eventName",
                                "expression": "(other)|",
                                "expressionList": [
                                    "(other)",
                                    ""
                                ],
                                "evaluation": 7,
                                "complement": true,
                                "isCaseSensitive": true
                            }
                        ]
                    },
                    {
                        "filters": [
                            {
                                "fieldName": "eventName",
                                "expression": "view_post",
                                "expressionList": [
                                    "view_post"
                                ],
                                "evaluation": 1,
                                "complement": false,
                                "isCaseSensitive": true
                            }
                        ]
                    },
                    {
                        "filters": [
                            {
                                "fieldName": "eventParamKey",
                                "expression": "post_id",
                                "expressionList": [
                                    "post_id"
                                ],
                                "evaluation": 1,
                                "complement": false,
                                "isCaseSensitive": true
                            }
                        ]
                    }
                ],
                "metrics": [
                    {
                        "name": "eventCount",
                    }
                ],
                "dateRanges": [
                    {
                        "startDate": "2024-01-01",
                        "endDate": "today"
                    }
                ],
                "rowAxis": {
                    "fieldNames": [
                        "eventParamValue"
                    ],
                    "sorts": [
                        {
                            "fieldName": "eventCount",
                            "sortType": 1,
                            "isDesc": true,
                            "pivotSortInfos": []
                        },
                        {
                            "fieldName": "eventParamValue",
                            "sortType": 1,
                            "isDesc": false,
                            "pivotSortInfos": []
                        }
                    ],
                    "limit": 5000,
                    "offset": 0,
                    "metaAggTypes": []
                }

            });

            console.log('Report result:');
            //response.rows.forEach((row) => {
             //   console.log(row.dimensionValues[0], row.metricValues[0]);
            //});

            return response;
        }
        return runReport();
    }
    catch (error) {
        setResponseStatus(event, 401);
        return {
            error: error,
        }
    }
})

