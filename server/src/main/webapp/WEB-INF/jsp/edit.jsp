<!DOCTYPE html>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<html lang="en">
<head>
    <meta charset="UTF-8">
    
    <c:choose>
        <c:when test="${empty customer.firstName}">
            <title>Update Your Information</title>
        </c:when>
        <c:otherwise>
            <title>Number of Visits</title>
        </c:otherwise>
    </c:choose>

    <!-- CSS only -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">

    <!-- JS, Popper.js, and jQuery -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js" integrity="sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI" crossorigin="anonymous"></script>
    
    <style>
        html {
            height: 100%;
        }
        body {
            height: 100%; 
            margin: 0; 
            background-repeat: no-repeat; 
            background-attachment: fixed;
            background-image: linear-gradient(rgba(4, 48, 48, 255), rgba(111, 109, 109, 255), transparent, rgba(4, 48, 48, 255))
        }
        img {
            height: 200px;
            margin-top: 5%;
            margin-bottom: 5%;
        }
    </style>

</head>
<body>

    <header>  
        <div class="text-center"><img src="/images/app-logo.png" alt="Lemme In logo"></div>       
    </header>

    <section>
        <div class="container-fluid h-100">
            <div class="row justify-content-center align-items-center h-100">
                <div class="col col-sm-6 col-md-6 col-lg-4 col-xl-3">
                    <form class="needs-validation" id="submit-form" novalidate>
                        <div class="form-group">
                            <input class="form-control form-control-lg inputDisable" name="firstName" autocomplete="off" placeholder="First Name" type="text" required>
                            <div class="invalid-feedback">Please type your first name.</div>
                        </div>
                        <div class="form-group">
                            <input class="form-control form-control-lg inputDisable" name="lastName" autocomplete="off" placeholder="Last Name" type="text" required>
                            <div class="invalid-feedback">Please type your last name.</div>
                        </div>
                        <div class="form-group">
                            <input class="form-control form-control-lg inputDisable" name="dob" placeholder="Date of Birth" type="date" required>
                            <div class="invalid-feedback">Please choose your date of birth.</div>
                        </div>

                        <c:choose>
                            <c:when test="${empty customer.email}">
                                <div class="form-group">
                                    <input readonly class="form-control form-control-lg" name="phoneNumber" placeholder="Phone Number" value="${customer.phoneNumber}" type="text">
                                </div>
                                <div class="form-group">
                                    <input pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                                            class="form-control form-control-lg inputDisable" name="email" autocomplete="off" placeholder="Email Address" type="email" required>
                                    <div class="invalid-feedback">Please type your email address.</div>
                                </div>
                            </c:when>
                            <c:otherwise>
                                <div class="form-group">
                                    <input pattern="^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$" class="form-control form-control-lg inputDisable" id="phoneNumber" name="phoneNumber" autocomplete="off" placeholder="Phone Number" type="tel" onchange="formatPhoneNumber(this.value)" required> 
                                    <div class="invalid-feedback">Please type your phone number.</div>
                                </div>
                                <div class="form-group">
                                    <input readonly class="form-control form-control-lg" name="email" placeholder="Email Address" value="${customer.email}" type="email">
                                </div>
                            </c:otherwise>
                        </c:choose>
                                              
                        <div class="form-group">
                            <small id="help" class="form-text text-muted" style="color: white !important;"> We'll never share your information with anyone else.</small>
                        </div>
                        <div class="form-group">
                            <button class="btn btn-primary btn-lg btn-block inputDisable" style="background-color: #376363FF; border-color: #376363FF;">Submit</button>
                        </div>
                    </form>

                    <!-- Modal -->
                    <div class="modal fade" id="visitConfirmModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLongTitle" style="color: #376363FF">Nice to see you!</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                    <p id="nameDisplay" style="color: #376363FF"></p>
                                    <p id="visitDisplay" style="color: #376363FF"></p>
                                    <p style="color: #376363FF">We hope to see you again soon. Bye!</p>
                                </div>
                                <div class="modal-footer justify-content-center">
                                    <button class="btn btn-primary" data-dismiss="modal" style="background-color: #376363FF; border-color: #376363FF;">OK</button>
                                </div>
                            </div>
                        </div>
                    </div>


                    <spring:eval expression="@environment.getProperty('admin.username')" var="username" />
                    <spring:eval expression="@environment.getProperty('admin.password')" var="password" />


                    <script>
                        // Example starter JavaScript for disabling form submissions if there are invalid fields
                        (function() {
                            'use strict';
                            window.addEventListener('load', function() {

                                if ("${customer.visitCounter}" != 0) {

                                    document.querySelector("#submit-form").style.display = "none";
                                    submit();
                                }
                                else {

                                    // Fetch all the forms we want to apply custom Bootstrap validation styles to
                                    var forms = document.getElementsByClassName('needs-validation');
                                    // Loop over them and prevent submission
                                    var validation = Array.prototype.filter.call(forms, function(form) {
                                        form.addEventListener('submit', function(event) {

                                            if (form.checkValidity() === false) {
                                                event.preventDefault();
                                                event.stopPropagation();
                                            }

                                            form.classList.add('was-validated');

                                            if (!form.checkValidity() === false) {
                                                submit();
                                            }
                                            
                                        }, false);
                                    });
                                }
                                
                            }, false);                            
                        })();

                        formatPhoneNumber = (phoneNumberString) => {
                            let isnum = /^\d+$/.test(phoneNumberString);
                            if (isnum) {
                                var cleaned = ('' + phoneNumberString).replace(/\D/g, '');
                                var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);             
                                if (match) {                                
                                    var intlCode = (match[1] ? '+1 ' : '');
                                    const phoneNumber = [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');
                                    document.querySelector("#phoneNumber").value = phoneNumber;
                                    return phoneNumber;
                                }
                                return null;
                            }
                            return null;                        
                        }

                        submit = () => {

                            event.preventDefault();

                            $.ajax({
                                type : 'PUT',
                                url : 'http://localhost:8080/lemmein/admin',
                                contentType: 'application/json',
                                data : JSON.stringify({
                                    
                                    id: "${customer.id}",

                                    firstName: document.getElementsByName("firstName")[0].value != "" ? document.getElementsByName("firstName")[0].value : "${customer.firstName}",
                                    lastName: document.getElementsByName("lastName")[0].value != "" ? document.getElementsByName("lastName")[0].value : "${customer.lastName}",
                                    dob: document.getElementsByName("dob")[0].value != "" ? document.getElementsByName("dob")[0].value : "${customer.dob}",
                                    phoneNumber: document.getElementsByName("phoneNumber")[0].value != "" ? document.getElementsByName("phoneNumber")[0].value : "${customer.phoneNumber}",
                                    email: document.getElementsByName("email")[0].value != "" ? document.getElementsByName("email")[0].value : "${customer.email}",

                                }),
                                beforeSend : function(xhr) {
                                    
                                    xhr.setRequestHeader("Authorization", "Basic " + btoa("${username}:${password}"));
                                    
                                },
                                success : function(data, status, xhr) {
                                    $('#visitConfirmModal').modal('show'); 
                                    
                                    const nameDisplay = "Thank you for visiting us, " + data.firstName + "!";
                                    document.querySelector("#nameDisplay").textContent = nameDisplay;

                                    const visitDisplay = "Your visiting times: " + data.visitCounter + ".";
                                    document.querySelector("#visitDisplay").textContent = visitDisplay;

                                    $.each(document.getElementsByClassName("inputDisable"), function(index, value) {
                                        value.disabled = true;
                                    })

                                },
                                error: function(xhr, status, error){
                                    console.log(xhr);
                                    console.error(error);
                                }
                            });
                        }

                    </script>

                </div>
            </div>
        </div>        
    </section>

</body>
</html>