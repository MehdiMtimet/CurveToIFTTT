# CurveToIFTTT
This project describes how to manage Curve Receipts to IFTTT in order to do pretty much whatever you want.

## Functionalities
You will find in this project a Code.gs file which is Google Apps Script file.
This script will parse for emails received in Gmailwith a custom label "Curve Receipts" and sends the info of the curve receipt to a predefined event named "curve_receipt_management".

Then, on the IFTTT side, you will be able to do pretty much whatever you want.
For instance, I have set up my receipts to go to a Google Sheet in order to better tracks payments.

## What does it work with ?
This script works only with a Gmail account and IFTTT. 

## Prerequisites
You will need to do the following for the project to be correctly set up

- Create a Gmail Filter that puts a special label to incoming receipts from Curve :

![Image of Gmail Filter](https://i.imgur.com/FplRiTr.png)

![Actions of Gmail](https://i.imgur.com/VAfX2zw.png)

- Authorize Google Apps Script access to your Gmail account

- Create a project in https://script.google.com/home then paste in the Code.gs file on this project

- Be sure to replace in the Code.gs your IFTTT maker key that you will find here in the documentation link here : https://ifttt.com/maker_webhooks

- Create your IFTTT Applet with an IF Trigger as Webhook, with the "curve_receipt_management" event name

Then you're ready to go and do as you please.
