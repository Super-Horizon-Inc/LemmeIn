<!DOCTYPE html>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<html lang="en">
<head>
    <meta charset="UTF-8">
    
    <c:choose>
        <c:when test="${empty customer.firstName}">
            <title>Edit Your Information</title>
        </c:when>
        <c:otherwise>
            <title>Number of Visits</title>
        </c:otherwise>
    </c:choose>

    <!-- CSS only -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">

    <!-- JS, Popper.js, and jQuery -->
    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js" integrity="sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI" crossorigin="anonymous"></script>
    
</head>
<body>

    <header>  
        <div class="text-center"><img src="/images/app-logo.png" alt="Lemme In logo"></div>       
    </header>

    <section>
        <div class="container-fluid h-100">
            <div class="row justify-content-center align-items-center h-100">
                <div class="col col-sm-6 col-md-6 col-lg-4 col-xl-3">
                    <form action="" class="needs-validation" novalidate>
                        <div class="form-group">
                            <input class="form-control form-control-lg" placeholder="First Name" type="text" required>
                            <div class="invalid-feedback">Please type your first name.</div>
                        </div>
                        <div class="form-group">
                            <input class="form-control form-control-lg" placeholder="Last Name" type="text" required>
                            <div class="invalid-feedback">Please type your last name.</div>
                        </div>
                        <div class="form-group">
                            <input class="form-control form-control-lg" placeholder="Date of Birth" type="date" required>
                            <div class="invalid-feedback">Please choose your date of birth.</div>
                        </div>

                        <c:choose>
                            <c:when test="${empty customer.email}">
                                <div class="form-group">
                                    <input readonly class="form-control form-control-lg" placeholder="Phone Number" value="${customer.phoneNumber}" type="text">
                                </div>
                                <div class="form-group">
                                    <input pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                                            class="form-control form-control-lg" placeholder="Email Address" type="email" required>
                                    <div class="invalid-feedback">Please type your email address.</div>
                                </div>
                            </c:when>
                            <c:otherwise>
                                <div class="form-group">
                                    <input minlength="10" maxlength="11" class="form-control form-control-lg" id="phoneNumber" placeholder="Phone Number" type="text" onchange="formatPhoneNumber(this.value)" required> 
                                    <div class="invalid-feedback">Please type your phone number.</div>
                                </div>
                                <div class="form-group">
                                    <input readonly class="form-control form-control-lg" placeholder="Email Address" value="${customer.email}" type="email">
                                </div>
                            </c:otherwise>
                        </c:choose>
                                              
                        <div class="form-group">
                            <small id="help" class="form-text text-muted"> We'll never share your information with anyone else.</small>
                        </div>
                        <div class="form-group">
                            <button class="btn btn-primary btn-lg btn-block">Submit</button>
                        </div>
                    </form>

                    <script>
                        // Example starter JavaScript for disabling form submissions if there are invalid fields
                        (function() {
                            'use strict';
                            window.addEventListener('load', function() {
                                // Fetch all the forms we want to apply custom Bootstrap validation styles to
                                var forms = document.getElementsByClassName('needs-validation');
                                // Loop over them and prevent submission
                                var validation = Array.prototype.filter.call(forms, function(form) {
                                    form.addEventListener('submit', function(event) {                                  
                                        if (form.checkValidity() === false || !isValidPhoneNumber(form.querySelector("#phoneNumber").value)) {
                                            event.preventDefault();
                                            event.stopPropagation();
                                        }
                                        form.classList.add('was-validated');

                                        let phoneNumber = form.querySelector("#phoneNumber").value;
                                        if (phoneNumber.length > 14) {
                                            phoneNumber = phoneNumber.split('+1 ')[1];
                                        }
                                        form.querySelector("#phoneNumber").value =  phoneNumber;
                                        
                                    }, false);
                                });
                            }, false);                            
                        })();

                        formatPhoneNumber = (phoneNumberString) => {
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

                        isValidPhoneNumber = (phoneNumberString) => {
                            return this.formatPhoneNumber(phoneNumberString) != null ? true : false
                        }

                    </script>

                </div>
            </div>
        </div>        
    </section>

</body>
</html>