var RegistrationForm;
$(function () {
    var Control = function () {
        return {
            imgprofile: $(".imgprofile"),
            Signprofile: $(".Signprofile"),
            RegistrationNo: $(".RegistrationNo"),
            name: $(".name"),
            dob: $(".dob"),
            FsthersName: $(".FsthersName"),
            Mobile: $(".Mobile"),
            Email: $(".Email"),
            divregCertificate: $("#divregCertificate"),

            Degree: $(".Degree"),
            CourseofStudy: $(".CourseofStudy"),
            Subject: $(".Subject"),
            CollegeID: $(".CollegeID"),
            CollegeName: $(".CollegeName"),
            Category: $(".Category"),
            isemployedanyOrg: $(".isemployedanyOrg"),
            Gender: $(".Gender"),
            PWD: $(".PWD"),
            MaritialStatus: $(".MaritialStatus"),
            Nationality: $(".Nationality"),

            PermAddress1: $(".PermAddress1"),
            PermAddress2: $(".PermAddress2"),
            PermLocality: $(".PermLocality"),
            PermPIN: $(".PermPIN"),
            PermCountry: $(".PermCountry"),
            PermState: $(".PermState"),
            PermDistrict: $(".PermDistrict"),

            PresAddress1: $(".PresAddress1"),
            PresAddress2: $(".PresAddress2"),
            PresLocality: $(".PresLocality"),
            PresPIN: $(".PresPIN"),
            PresCountry: $(".PresCountry"),
            PresState: $(".PresState"),
            PresDistrict: $(".PresDistrict"),

            tblDisplayPreQual: $("#tblDisplayPreQual"),
            idBrkInStd: $("#idBrkInStd"),
            idprevwbuhsreg: $("#idprevwbuhsreg"),
            idIsAnyPrevRegUniv: $("#idIsAnyPrevRegUniv"),
            idUnivName: $("#idUnivName"),
            tblDisplayDocReq: $("#tblDisplayDocReq"),
            divHSQDetails: $(".divHSQDetails"),

            divBasicInformation: $(".divBasicInformation"),
            BIPlus: $(".BIPlus"),
            BIMinus: $(".BIMinus"),

            divHigherSecondary: $(".divHigherSecondary"),
            HIPlus: $(".HIPlus"),
            HIMinus: $(".HIMinus"),

            divAddressInformation: $(".divAddressInformation"),
            AIPlus: $(".AIPlus"),
            AIMinus: $(".AIMinus"),

            divQualificationInformation: $(".divQualificationInformation"),
            QIPlus: $(".QIPlus"),
            QIMinus: $(".QIMinus"),

            divUploadDetails: $(".divUploadDetails"),
            UIPlus: $(".UIPlus"),
            UIMinus: $(".UIMinus"),
        };
    };
    var objServer = {
        LoadStudentRegistrationDetailsOnPageLoad: function (data,callback) {
            $.ajax({
                type: 'post',
                contentType: 'application/json;charset=utf-8;',
                data: JSON.stringify(data),
                dataType: 'json',
                async: false,
                url: '/StudentProfile/LoadStudentProfileDetailsOnPageLoad',
                success: function (responce) {
                    $(".loading-overlay").hide();
                    callback(responce);
                },
                error: function () {
                    $(".loading-overlay").hide();
                    callback('error');
                }
            });
        },
    };
    var objClient = {
        Initialization: function () {
            this.applicationForm = null;
            this.tmpPhotopath = null;
            this.tmpSignaturepath = null;
            objClient.Events.Click();
            objClient.Events.OnLoad();
            objClient.Events.KeyPress();
            objClient.Events.Blur();
            objClient.Events.Changed();
            objClient.Events.KeyUp();
            objClient.Events.AutoComplete();
        },

        Events: {
            OnLoad: function () {
                objClient.CommonMethods.LoadStudentRegistrationDetailsOnPageLoad();

                Control().divBasicInformation.hide();
                Control().divHigherSecondary.hide();
                Control().divAddressInformation.hide();
                Control().divQualificationInformation.hide();
                Control().divUploadDetails.hide();
            },
            Click: function () {
                Control().BIPlus.click(function () {
                    Control().divBasicInformation.show();
                    Control().BIPlus.hide();
                    Control().BIMinus.show();
                });
                Control().BIMinus.click(function () {
                    Control().divBasicInformation.hide();
                    Control().BIMinus.hide();
                    Control().BIPlus.show();
                });
                //------------------------------
                Control().HIPlus.click(function () {
                    Control().divHigherSecondary.show();
                    Control().HIPlus.hide();
                    Control().HIMinus.show();
                });
                Control().HIMinus.click(function () {
                    Control().divHigherSecondary.hide();
                    Control().HIMinus.hide();
                    Control().HIPlus.show();
                });
                
                //-----------------------------------------
                Control().AIPlus.click(function () {
                    Control().divAddressInformation.show();
                    Control().AIPlus.hide();
                    Control().AIMinus.show();
                });
                Control().AIMinus.click(function () {
                    Control().divAddressInformation.hide();
                    Control().AIMinus.hide();
                    Control().AIPlus.show();
                });
                //-------------------------------
                Control().QIPlus.click(function () {
                    Control().divQualificationInformation.show();
                    Control().QIPlus.hide();
                    Control().QIMinus.show();
                });
                Control().QIMinus.click(function () {
                    Control().divQualificationInformation.hide();
                    Control().QIMinus.hide();
                    Control().QIPlus.show();
                });
                //-----------------------
                Control().UIPlus.click(function () {
                    Control().divUploadDetails.show();
                    Control().UIPlus.hide();
                    Control().UIMinus.show();
                });
                Control().UIMinus.click(function () {
                    Control().divUploadDetails.hide();
                    Control().UIMinus.hide();
                    Control().UIPlus.show();
                });
                
            },
            Blur: function () {
            },
            Changed: function () {
                
            },
            KeyPress: function () {
            },
            KeyUp: function () {
                
            },
            AutoComplete: function () {
                 
            }
        },
        CommonMethods: {
            LoadStudentRegistrationDetailsOnPageLoad: function () {
                var urlParams = new URLSearchParams(window.location.search);
                var payLoad = null;
                if (urlParams.has('appId')) {
                    payLoad = { ApplicationId: urlParams.get('appId')};
                }
                objServer.LoadStudentRegistrationDetailsOnPageLoad(payLoad,function (response) {
                    var resdata = response;
                    if (response.Status == 200) {
                        if (response.Data != null) {
                            var ProfileData = response.Data.Profile;
                            var ApprovalData = response.Data.ApprovalStatus;
                            $("#regnotComplete").hide();
                            $("#regComplete").show();

                           
                           if (ApprovalData.IsCApproved == true) {
                               $(".progressbar li:nth-child(2)").append("<span> - Completed </span>");
                               $(".progressbar li:nth-child(2)").addClass("active");
                               //$(".progressbar li.active + li:after").css("background","#3aac5d");
                           }
                           if (ApprovalData.IsCApproved == false) {
                               $(".progressbar li:nth-child(2)").append("<span> - Pending </span>");
                               $(".progressbar li:nth-child(2)").removeClass("active");
                           }
                           if (ApprovalData.IsUApproved == true) {
                               $(".progressbar li:nth-child(3)").append("<span> - Completed </span>");
                               $(".progressbar li:nth-child(3)").addClass("active");
                           }
                           if (ApprovalData.IsUApproved == false) {
                               $(".progressbar li:nth-child(3)").append("<span> - Pending </span>");
                               $(".progressbar li:nth-child(3)").removeClass("active");
                           }


                           if (ProfileData.objListReqDoc.length > 0) {
                               if (ProfileData.objListReqDoc[0].DocumentID == 1) {
                                   Control().imgprofile.attr("src", ProfileData.objListReqDoc[0].DocumentOriginalPath);
                               }
                               if (ProfileData.objListReqDoc[0].DocumentID == 2) {
                                   Control().Signprofile.attr("src", ProfileData.objListReqDoc[0].DocumentOriginalPath);
                               }
                               if (ProfileData.objListReqDoc[1].DocumentID == 1) {
                                   Control().imgprofile.attr("src", ProfileData.objListReqDoc[1].DocumentOriginalPath);
                               }
                               if (ProfileData.objListReqDoc[1].DocumentID == 2) {
                                   Control().Signprofile.attr("src", ProfileData.objListReqDoc[1].DocumentOriginalPath);
                               }
                               
                           }
                            Control().name.text(ProfileData.Name);
                            Control().dob.text(ProfileData.DOB);
                            Control().FsthersName.text(ProfileData.FathersName);
                            Control().Mobile.text(ProfileData.Mobile);
                            Control().Email.text(ProfileData.Email);
                            Control().RegistrationNo.text(ProfileData.RegistrationNo);
                            if (ProfileData.IsRegCerAvailable == 1) {
                                var RegCurl = "<a target='_blank' class='clsPdfView' href='" + ProfileData.RegCerUrl + "'><div style='text-align:left;padding-left: 21px;'>Registration Certificate  :   <image class='pdfIcon' src='/images/pdf-icon.gif'  style='height:32px;width:32px'></image></div></a>";
                                Control().divregCertificate.append(RegCurl);
                            }
                            else {
                                Control().divregCertificate.append("");
                            }
                            //---------------------------------
                            Control().Degree.text(ProfileData.objCourseDtls.DegreeCourseName);
                            Control().CourseofStudy.text(ProfileData.objCourseDtls.CourseName);
                            Control().Subject.text(ProfileData.objCourseDtls.CoreSubjectName);
                            Control().CollegeID.text(ProfileData.objCourseDtls.CollegeCode);
                            Control().CollegeName.text(ProfileData.objCourseDtls.CollegeName);
                            //--------------------------------
                            Control().Category.text(ProfileData.CategoryName);
                            Control().isemployedanyOrg.text(ProfileData.IsEmployed == "Y" ? "Yes" : "No");
                            //-------------------------------
                            Control().Gender.text(ProfileData.GenderName);
                            Control().PWD.text(ProfileData.PWD == "Y" ? "Yes" : "No");
                            Control().MaritialStatus.text(ProfileData.MarititalStatusName);
                            Control().Nationality.text(ProfileData.NationalityName);
                            //--------------------------------
                            Control().PermAddress1.text(ProfileData.objPermAddress.PermAddress1);
                            Control().PermAddress2.text(ProfileData.objPermAddress.PermAddress2);
                            Control().PermLocality.text(ProfileData.objPermAddress.PermLocalityCity);
                            Control().PermPIN.text(ProfileData.objPermAddress.PermPincode);
                            Control().PermCountry.text(ProfileData.objPermAddress.PermCountryName);
                            Control().PermState.text(ProfileData.objPermAddress.PermState);
                            Control().PermDistrict.text(ProfileData.objPermAddress.PermDistrict);
                            //-------------------------------
                            Control().PresAddress1.text(ProfileData.objPresentAddress.MailAddress1);
                            Control().PresAddress2.text(ProfileData.objPresentAddress.MailAddress2);
                            Control().PresLocality.text(ProfileData.objPresentAddress.MailLocalityCity);
                            Control().PresPIN.text(ProfileData.objPresentAddress.MailPincode);
                            Control().PresCountry.text(ProfileData.objPresentAddress.MailCountryName);
                            Control().PresState.text(ProfileData.objPresentAddress.MailState);
                            Control().PresDistrict.text(ProfileData.objPresentAddress.MailDistrict);
                            //------------------------------------------
                            objClient.CommonMethods.PopulatePrevoiusQualificationDetails(ProfileData.objListPQualDetails);

                            Control().idBrkInStd.text(ProfileData.BreakInStudies == "Y" ? "Yes" : "No");
                            Control().idprevwbuhsreg.text(ProfileData.WBUHSResgistration == "Y" ? "Yes" : "No");
                            Control().idIsAnyPrevRegUniv.text(ProfileData.PreviousUniversity == "Y" ? "Yes" : "No");
                            Control().idUnivName.text(ProfileData.PreviousUniversityBoardUniversityName);
                            //--------------------------------------------
                            Control().tblDisplayDocReq.append(objClient.CommonMethods.PopulateDocumentTable(ProfileData.objListReqDoc));
                            Control().divHSQDetails.append(objClient.CommonMethods.PopulateHigherSecondaryDetails(ProfileData.objHSDetails));
                        }
                    }
                    else {
                            $("#regnotComplete").show();
                            $("#regComplete").hide();
                    }
                });
            },
            PopulatePrevoiusQualificationDetails: function (objListPQualDetails) {
                var getRowString = function (rowData, i) {

                    var rowImageMarksheet = "<a target='_blank' class='clsPdfView' href='" + rowData.FileNameMarksheet + "'><div style='text-align:center'><image class='pdfIcon' " + (rowData.FileNameMarksheet != null ? 'src="/images/pdf-icon.gif"' : '') + "  style='height:32px;width:32px'></image></div></a>";
                    var rowImageCertificate = "<a target='_blank' class='clsPdfView' href='" + rowData.FileNameCertificate + "'><div style='text-align:center'><image class='pdfIcon' " + (rowData.FileNameCertificate != null ? 'src="/images/pdf-icon.gif"' : '') + "  style='height:32px;width:32px'></image></div></a>";

                    var rowstr = "<tr>";
                    rowstr += "<td>" + rowData.ExamName + "</td>";
                    rowstr += "<td>" + rowData.BoardUniversity +"</td>";
                    rowstr += "<td style='width: 104px;'>" + rowData.PassingYear +"</td>";
                    rowstr += "<td>" + rowData.RollNo +"</td>";
                    rowstr += "<td>" + rowData.TotalMarks + "</td>";
                    rowstr += "<td>" + rowData.MarksObtained + "</td>";
                    rowstr += "<td>" + rowData.MarksPercentage + "</td>";
                    rowstr += "<td style='text-align:center'><label style='color: red;font-size: smaller;' class='lblQualDocNamemarksheet'>" + rowImageMarksheet + "<label></td>";
                    rowstr += "<td style='text-align:center'><label style='color: red;font-size: smaller;' class='lblQualDocNameCert'>" + rowImageCertificate + "<label></td>";
                    rowstr += "</tr>";

                    return rowstr;
                };
                var appendToBody = function (rowString) {
                    Control().tblDisplayPreQual.find("tbody").append(rowString);
                };
                (function () {
                    Control().tblDisplayPreQual.find("tbody").empty();
                    var rowDatas = objListPQualDetails;
                    var i = 1;
                    $.each(rowDatas, function (index, value) {
                        var rowString = getRowString(value, i);
                        appendToBody(rowString);
                        i++;
                    });
                   
                }());
            },
            PopulateDocumentTable: function (ReqRes) {
                var rowstr = "<table class='table table-striped'>";
                rowstr += "<thead>";
                rowstr += "<tr>";

                rowstr += "<th style='text-align:center;'>Sl. No.</th>";
                rowstr += "<th style='text-align:center;'>Document Name</th>";
                rowstr += "<th style='text-align:center' >Preview</th>";


                rowstr += "</tr>";
                rowstr += "</thead>";
                rowstr += "<tbody>";

                var table = rowstr;
                var getRowString = function (rowData, i) {

                    var sizeMessage = "[ Size between " + rowData.DocFromSize + "KB and " + rowData.DocToSize + "KB ]";
                    var FileTypeMessage = "[ File type " + rowData.DocumentFileType + "]";
                    var DisplayRwo = "";


                    var rowImage = "<img id= 'previewDoc'  class='clsImageView' src = " + rowData.DocumentPath + " alt = '' style = 'max-width: 160px; max-height: 120px; border: none' />";
                    var rowPDF = "<a target='_blank' class='clsPdfView' href='" + rowData.DocumentPath + "'><div style='text-align:center'><image class='pdfIcon' " + (rowData.DocumentPath != null ? 'src="/images/pdf-icon.gif"' : '') + "  style='height:32px;width:32px'></image></div></a>";
                    if (rowData.DocumentSection == "A") {
                        DisplayRwo = rowImage;
                    }
                    if (rowData.DocumentSection == "B") {
                        DisplayRwo = rowPDF;
                    }

                    var rowstr = "<tr>";
                    rowstr += "<td class='' style='width: 72px;text-align:center;'>" + i + "</td>";
                    rowstr += "<td class='' style='width: 222px;'>" + rowData.DocumentName + "</td>";
                    rowstr += "<td class=''  style='width: 350px;text-align:center;'>" + DisplayRwo + "</td > ";

                    rowstr += "</tr>";
                    return rowstr;
                };
                var appendToBody = function (rowString) {
                    table = table + rowString;
                };
                (function () {

                    var data = ReqRes;
                    var i = 1;

                    $.each(data, function (index, value) {
                        if (index >= 2) {
                            var rowString = getRowString(value, i);
                            appendToBody(rowString);
                            i++;
                        }
                    });
                }());
                table += "</tbody>";
                table += "</table>";
                return table;
            },
            PopulateHigherSecondaryDetails: function (ReqRes) {
                var html = "<table class='table table-bordered' style='width: 100%;'>"
                html += "<thead>"
                html += "<tr  style='background-color: #bcc1e2;'>"
                html += "<th>Subject</th>"
                html += "<th>Total Marks</th>"
                html += "<th>Obtained Marks</th>"
                html += "<th>Marks (%)</th>"

                html += "</tr>"
                html += "</thead>"
                html += "<tbody>"
                /*********************************/
                html += "<tr>"
                html += "<td>" + (ReqRes.SubjectName1) + "</td>"
                html += "<td>" + (ReqRes.SubjectTotalMarks1) + "</td>"
                html += "<td>" + (ReqRes.SubjectMarksObtained1) + "</td>"
                html += "<td>" + (ReqRes.SubjectMarkPercent1) + "</td>"
                html += "</tr>"
                /*********************************/
                html += "<tr>"
                html += "<td>" + (ReqRes.SubjectName2) + "</td>"
                html += "<td>" + (ReqRes.SubjectTotalMarks2) + "</td>"
                html += "<td>" + (ReqRes.SubjectMarksObtained2) + "</td>"
                html += "<td>" + (ReqRes.SubjectMarkPercent2) + "</td>"
                html += "</tr>"
                /*********************************/
                html += "<tr>"
                html += "<td>" + (ReqRes.SubjectName3) + "</td>"
                html += "<td>" + (ReqRes.SubjectTotalMarks3) + "</td>"
                html += "<td>" + (ReqRes.SubjectMarksObtained3) + "</td>"
                html += "<td>" + (ReqRes.SubjectMarkPercent3) + "</td>"
                html += "</tr>"
                /*********************************/
                html += "</tbody>"
                html += "</table>"

                return html;
            }
        }
    };
    objClient.Initialization();
});