# HathiTrust Availability

Ex Libris Cloud App which checks HathiTrust availability for records in Alma. For more information, see the [App Center entry](https://developers.exlibrisgroup.com/appcenter/hathitrust-availability/).

## Availability Calculation

Note that the app lists availability based on the information provided in the `usRightsString` field of the [items response](https://www.hathitrust.org/bib_api#items) from the HathiTrust Bibliographic API. If any of the items include the string "full" the app shows "Full View". Otherwise it shows "Limited" 

Please use GitHub issues to report defects, ask questions, or suggest enhancements.
https://github.com/ExLibrisGroup/alma-hathitrust-availability/issues

