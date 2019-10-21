<?php

if (isset($_POST['email']) && !empty($_POST['email'])) {

    // Email address to send
    $to = 'newuser@websitename.com';

    // Email Subject
    $subject = 'New contact request by ' . strip_tags($_POST['name']);

    // Email From setting
    $headers = "From:" . strip_tags($_POST['name']) ." ". strip_tags($_POST['email']) . "\r\n";

    // Email reply
    $headers .= "Reply-To: " . strip_tags($_POST['email']) . "\r\n";

    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";
    
    /* Admin email start */

    $message = '<html xmlns = "http://www.w3.org/1999/xhtml">
				<head>
					<meta http-equiv = "Content-Type" content = "text/html; charset=utf-8" />
					<title>Travel Tourism</title>
				</head>

				<body>

					<table width = "800" border = "0" align = "center" cellpadding = "0" cellspacing = "0" style = "font-family:Verdana, Arial, Helvetica, sans-serif; font-size:12px;">
						<tr>
							<td bgcolor = "#0a1524">
								<table width = "100%" border = "0" cellspacing = "1" cellpadding = "5">
									<tr>
									<td height = "80" colspan = "2" align = "center" valign = "middle" bgcolor = "#0a1524"><a href = "#" title = "" target = ""><img src="http://www.websitename.com/images/logo.png" alt=""></a></td>
									</tr>
									<tr>
									<td height = "80" colspan = "2" valign = "middle" bgcolor = "#FFFFFF">Hello Admin, <br />
									<br />
									New enquiry has been received from Travel Agency. Details are:</td>
									</tr>

									<tr>
									<td width = "28%" height = "35" align = "left" valign = "middle" bgcolor = "#FFFFFF"><strong>Full Name:</strong></td>
									<td width = "72%" height = "35" align = "left" valign = "middle" bgcolor = "#FFFFFF">' . strip_tags($_POST['name']).'</td>
									</tr>
									<tr>
									<td height = "35" align = "left" valign = "middle" bgcolor = "#FFFFFF"><strong>Email:</strong></td>
									<td height = "35" align = "left" valign = "middle" bgcolor = "#FFFFFF">'. strip_tags($_POST['email']) .'</td>
									</tr>
									<tr>
									<td height = "35" align = "left" valign = "middle" bgcolor = "#FFFFFF"><strong>Phone number:</strong></td>
									<td height = "35" align = "left" valign = "middle" bgcolor = "#FFFFFF">'. strip_tags($_POST['phone']) .'</td>
									</tr>                   
									<tr>
										<td height = "35" align = "left" valign = "middle" bgcolor = "#FFFFFF"><strong>ZipCode:</strong></td>
										<td height = "35" align = "left" valign = "middle" bgcolor = "#FFFFFF">'. strip_tags($_POST['zipcode']) .'</td>
									</tr>
									<tr>
										<td height = "35" align = "left" valign = "middle" bgcolor = "#FFFFFF"><strong>Arrival Date:</strong></td>
										<td height = "35" align = "left" valign = "middle" bgcolor = "#FFFFFF">'. strip_tags($_POST['arrival-date']) .'</td>
									</tr>
									<tr>
										<td height = "35" align = "left" valign = "middle" bgcolor = "#FFFFFF"><strong>Departure Date:</strong></td>
										<td height = "35" align = "left" valign = "middle" bgcolor = "#FFFFFF">'. strip_tags($_POST['departure-date']) .'</td>
									</tr>                        
									<tr>
										<td height = "35" align = "left" valign = "middle" bgcolor = "#FFFFFF"><strong>How Many Persons?:</strong></td>
										<td height = "35" align = "left" valign = "middle" bgcolor = "#FFFFFF">'. strip_tags($_POST['select-persons']) .'</td>
									</tr>
														 
									<tr>                        
									<td height = "35" align = "left" valign = "top" bgcolor = "#FFFFFF"><strong>Comments:</strong></td>
									<td height = "35" align = "left" valign = "top" bgcolor = "#FFFFFF">'. strip_tags($_POST['comments']) .'</td>
									</tr>

									<tr>
									  <td height="50" colspan="2" align="left" valign="middle" bgcolor="#FFFFFF">This e-mail was sent from <a href="http://www.websitename.com" target="_blank">websitename.com</a> </td>
									</tr>
								</table>
							</td>
						</tr>
					</table>        
				</body>
			</html>';
		
		/* Autoresponder email to user */
		
		$body = "<html><body>";
		$body .='<table width="800" border="0" align="center" cellpadding="0" cellspacing="0" style="font-family:Verdana, Arial, Helvetica, sans-serif; font-size:12px;">
				<tr>
					<td bgcolor="#0a1524">
						<table width="100%" border="0" cellspacing="1" cellpadding="5">
							<tr>
							  <td width="100%" height="80" align="center" valign="middle" bgcolor="#0a1524"><a href="#" title="" target=""><img src="http://www.websitename.com/images/logo.png" alt=""></a></td>
							</tr>
							<tr>
							  <td height="200" valign="middle" bgcolor="#FFFFFF">Hello ' . strip_tags($_POST["name"]) .',<br />
								<br />
								Thank you for your interest in our Travel Tourism. <br />
								<br />
								We received your request and we will get back to you as soon as possible. <br />
								<br /></td>
							  </tr>

							<tr>
							  <td height="50" align="left" valign="middle" bgcolor="#FFFFFF">Kind regards,<br />
								<a href="#" target="_blank">Travel Agency</a></td>
							  </tr>
						</table>
					</td>
				</tr>
			</table>
		</body></html>';

    $headers2 = "From: LandingPage <info@websitename.com> \r\n";
    $headers2 .= "Reply-To: " . 'noreplay@websitename.com'. "\r\n";
	$headers2 .= "MIME-Version: 1.0\r\n";
    $headers2 .= "Content-Type: text/html; charset=ISO-8859-1\r\n";
    
    mail(strip_tags($_POST['email']), 'Thank you for reaching at us.', $body, $headers2);
    
	$responseArray = array('success' => true, 'message' => '');
    if (mail($to, $subject, $message, $headers)) {
	    $responseArray['success'] = true;
        $responseArray['message'] = "Request sent successfully";
    } else {
        $responseArray['message'] = "Some problem occurred to send mail.";
        $responseArray['success'] = false;
    }
    echo json_encode($responseArray);
}
exit();
