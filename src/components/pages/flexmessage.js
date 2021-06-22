const flex = () => {
    contents: {
        {
            "type": "bubble",
            "size": "mega",
            "body": {
              "type": "box",
              "layout": "vertical",
              "contents": [
                {
                  "type": "box",
                  "layout": "vertical",
                  "contents": [
                    {
                      "type": "box",
                      "layout": "vertical",
                      "contents": [
                        {
                          "type": "text",
                          "text": "คุณได้รับเชิญเข้าร่วมงานแต่ง",
                          "size": "lg",
                          "color": "#ffbb33",
                          "weight": "bold",
                          "style": "normal",
                          "margin": "none",
                          "decoration": "none",
                          "align": "center"
                        },
                        {
                          "type": "box",
                          "layout": "vertical",
                          "contents": [
                            {
                              "type": "text",
                              "text": data.hostOne,
                              "margin": "xl",
                              "size": "lg",
                              "color": "#30302f",
                              "weight": "regular",
                              "style": "normal",
                              "decoration": "none",
                              "align": "center"
                            }
                          ]
                        },
                        {
                          "type": "box",
                          "layout": "vertical",
                          "contents": [
                            {
                              "type": "text",
                              "text": "กับ",
                              "margin": "xl",
                              "size": "md",
                              "color": "#30302f",
                              "weight": "regular",
                              "style": "normal",
                              "decoration": "none",
                              "align": "center"
                            }
                          ]
                        },
                        {
                          "type": "box",
                          "layout": "vertical",
                          "contents": [
                            {
                              "type": "text",
                              "text": data.hostTwo,
                              "margin": "xl",
                              "size": "lg",
                              "color": "#30302f",
                              "weight": "regular",
                              "style": "normal",
                              "decoration": "none",
                              "align": "center"
                            }
                          ]
                        },
                        {
                          "type": "box",
                          "layout": "vertical",
                          "contents": [
                            {
                              "type": "text",
                              "text": "วันที่ 13 ม.ค. 2564 เวลา 13:00",
                              "margin": "xl",
                              "size": "sm",
                              "color": "#30302f",
                              "weight": "regular",
                              "style": "normal",
                              "decoration": "none",
                              "align": "center"
                            }
                          ],
                          "margin": "xs"
                        },
                        {
                          "type": "box",
                          "layout": "vertical",
                          "contents": [
                            {
                              "type": "text",
                              "text": data.locationName,
                              "margin": "md",
                              "size": "md",
                              "color": "#30302f",
                              "weight": "regular",
                              "style": "normal",
                              "decoration": "none",
                              "align": "center"
                            }
                          ],
                          "offsetTop": "-10px",
                          "margin": "xs"
                        },
                        {
                          "type": "box",
                          "layout": "vertical",
                          "contents": [
                            {
                              "type": "text",
                              "text": data.phone,
                              "margin": "none",
                              "size": "md",
                              "color": "#30302f",
                              "weight": "regular",
                              "style": "normal",
                              "decoration": "none",
                              "align": "center"
                            }
                          ],
                          "offsetTop": "-10px",
                          "margin": "xs"
                        }
                      ],
                      "margin": "none"
                    },
                    {
                      "type": "box",
                      "layout": "vertical",
                      "contents": [
                        {
                          "type": "separator"
                        }
                      ],
                      "paddingTop": "md",
                      "margin": "lg"
                    },
                    {
                      "type": "box",
                      "layout": "vertical",
                      "contents": [
                        {
                          "type": "button",
                          "action": {
                            "type": "uri",
                            "label": "action",
                            "uri": "http://linecorp.com/"
                          },
                          "style": "primary",
                          "color": "#ffbb33",
                          "gravity": "center",
                          "height": "sm",
                          "margin": "none"
                        }
                      ],
                      "borderWidth": "1px",
                      "cornerRadius": "4px",
                      "spacing": "none",
                      "margin": "none",
                      "height": "50px",
                      "offsetTop": "xl"
                    }
                  ],
                  "position": "absolute",
                  "offsetBottom": "0px",
                  "offsetStart": "0px",
                  "offsetEnd": "0px",
                  "spacing": "none",
                  "margin": "none",
                  "offsetTop": "20px",
                  "backgroundColor": "#ffffff"
                }
              ],
              "paddingAll": "0px",
              "height": "350px",
              "background": {
                "type": "linearGradient",
                "angle": "0deg",
                "startColor": "#f5d0e5",
                "endColor": "#ffffff"
              }
            },
            "styles": {
              "header": {
                "separator": true
              },
              "body": {
                "backgroundColor": "#ffffff"
              }
            }
          }
    }
}