        // Helper function called when the "Continue Scanning" button is clicked
        function continueScanning() {
            if (picker) {
                continueButton.disabled = true;
                // Resume scanning
                picker.resumeScanning();
            }
        }
        // Configure the library and activate it with a license key
        const licenseKey = "AVSrLAG7GpiBBqFaGyVHMuQYVIxyIrL0zB5oAn4qH9oGbLpHmykwbW9KffwSQHT4cUbCfFgc/7nUfR9odw3cH4REfL5Vd1I5GBonVkJ5B9DRUrshwU4orCZq0xWIZAJvJUlSmetgurNuGNO5aFZhtO8TuwYoVx3e8XRp5jxVn/V/ZwzaJktV7xJboLNsVN71m19cGRZESQz0XeXEgHKlIGRgAXQrYicwe3LZrwV60laOWlFWwE0DIXZ80vyfeYXC6VG7uQtd+wooT5C3sVDFtCVa4kXcVQ5qgW3tgVJsiEAJVwMBzHWoXsN/vnXrQr2pimohDHcZDjzLCx7GyhIxL/Fa6+irJ8ty7cpFWPIcCxYNpfuc8FNKVXrmOVVPK42NeH5CWFN4e0MaM02k2gBZw6hXXBYUYp0LBFDBp+btHFmY3VAAHDiMe049sz2x0HK3RcoS4xebtvEFa/7l3UElJpqURlAjHPFof0ZI0m0o/E656r5lVp/dF7gQhfRPWT8qS63kBEqp/Rt/M/HssXj2CpjesU9yujqhAsYqWyqaTf9N9UP/Bu9MlfZWkheG/cNBgjE83/n7TQIHQehmaXRGY03CQhxbNT1iPOEonDjb4cZrtW1LAgHECqk+SkeRyvhkYXMZN+sV3JIbQW2yOp3Hl8yfPR+9VRnbGet4Hn5qh6H/S1SRhPmCpJGimZqQWvMbW4NRZZvX0mhMOqb+uSrQhVnsYXfB5IjPNsOOIHm0zDFCAi1CgWCzpSJgPnxWrPNHwyaYT+qvbODKhMHli5de3gx1/QF7o4JPV4wUJ5yijp0v1hW5pxdt0jZ2DmjYTa3ItkFpDV1hNO93n9s6imfop6Yh1MM5rcQcAmV9bqhyzM6kiiompebrADshkjl6SF3mcEBE2zV92u0ftKHGmxu2vi63d2EDo0Ap1/Tqk9DHcAaTXJZHqxS577/QEbMFtGZlWz0A62V2+ZmyoaDxZUQBBD9eSVmZF3AlM4fCeaSwzkpRhvA/EwUMMeDOo2rIEg==";
        // const engineLocation = "build"; // the folder containing the engine
        // or, if using a CDN,
        const engineLocation = "https://unpkg.com/scandit-sdk/build"
        ScanditSDK.configure(licenseKey, { engineLocation: engineLocation });
        const scannerContainer = document.getElementById("scandit-barcode-picker");
        const resultContainer = document.getElementById("scandit-barcode-result");
        const continueButton = document.getElementById("continue-scanning-button");
        continueButton.disabled = true;
        continueButton.hidden = true;
        let picker;
        // Create & start the picker
        ScanditSDK.BarcodePicker.create(scannerContainer, {
                playSoundOnScan: true,
                vibrateOnScan: true
            })
            .then(barcodePicker => {
                picker = barcodePicker;
                // Create the settings object to be applied to the scanner
                const scanSettings = new ScanditSDK.ScanSettings({
                    enabledSymbologies: ["ean8", "ean13", "upca", "upce", "code128", "code39", "code93",
                        "itf"
                    ],
                    codeDuplicateFilter: 1000
                });
                picker.applyScanSettings(scanSettings);
                // If a barcode is scanned, show it to the user and pause scanning
                // (scanning is resumed when the user clicks "Continue Scanning")
                picker.onScan(scanResult => {
                    continueButton.hidden = false;
                    continueButton.disabled = false;
                    picker.pauseScanning();
                    resultContainer.innerHTML = scanResult.barcodes.reduce((string, barcode) =>
                        string +
                        `${ScanditSDK.Barcode.Symbology.toHumanizedName(barcode.symbology)}: ${barcode.data}<br>`,
                        '');
                });
                picker.onScanError(error => {
                    alert(error.message);
                });
                picker.resumeScanning();
            })
            .catch(error => {
                alert(error);
            });
