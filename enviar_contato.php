<?php
	use PHPMailer\PHPMailer\PHPMailer;
	use PHPMailer\PHPMailer\Exception;

	include_once("phpmailer/src/Exception.php");
	include_once("phpmailer/src/PHPMailer.php");
	include_once("phpmailer/src/SMTP.php");


	$nome = htmlentities($_POST["nome"]);
	$email = htmlentities($_POST["email"]);
	$telefone = htmlentities($_POST["telefone"]);
	$assunto = "Novo Contato Via Site";
	$mensagem = htmlentities($_POST["mensagem"]);

	$ip = $_SERVER['REMOTE_ADDR'];
	date_default_timezone_set('America/Sao_Paulo');
	$data = date('d-m-Y H:i:s');

	$corpo = '<table border="0" cellpadding="0" cellspacing="0" width="100%">
				<tr>
					<td style="padding: 20px 0 30px 0;">
						<table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
							<!--logotipo-->
							<tr style="">
								<td align="center" style="padding: 15px 0px;">
									<img src="http://www.devshell.com.br/media/images/logo.png" alt="logotipo" style="display: block; width: 150px; height: auto;" />
								</td>
							</tr>
						</table>
						<table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="border-collapse: collapse;border: 2px solid #212529">
							<!--conteudo-->
							<tr>
								<td bgcolor="#ffffff" style="padding: 40px 30px 40px 30px;" >
									<table border="0" cellpadding="0" cellspacing="0" width="100%" >
										<!--assunto-->
										<tr>
											<td colspan="2" style="color: #3B3B3B; font-family: Arial, sans-serif; font-size: 18px; text-align:center;">
												<b>Novo Contato de '.$nome. '</b><br/>
											</td>
										</tr>
										<!--Mensagem corpo-->
										<tr>
											<td style="padding: 20px 0 30px 0; color: #3B3B3B; font-family: Arial, sans-serif; font-size: 16px; line-height: 20px; border-bottom: 1px solid #3B3B3B;" colspan="3">
												<!--b>Mensagem</b-->
												<p>'.$mensagem.'</p>
												<br /><b>De: </b>'.$nome. '
											</td>
										</tr>
										<!--Informações Gerais-->
										<!--table border="0" cellpadding="0" cellspacing="0" width="100%"></table-->
										 <tr>
											<td width="300" valign="top" style="color: #3B3B3B; font-family: Arial, sans-serif; font-size: 16px; line-height: 24px;padding-top: 30px;">
												<b>Email: </b><p>'.$email.'</p>
											</td>
											<td width="150" valign="top" style="color: #3B3B3B; font-family: Arial, sans-serif; font-size: 16px; line-height: 20px;padding-top: 30px;">
												<b>Telefone: </b><p>'.$telefone.'</p>
											</td>
										 </tr>
									</table>
								</td>
							</tr>
							<!--rodapé-->
							<tr>
								<td bgcolor="#212529" style="padding: 30px 30px 30px 30px;border: 2px solid #212529;border-top: 0; text-align:center;">
									<table border="0" cellpadding="0" cellspacing="0" width="100%">
										<tr>
											<td style="color: #ffffff; font-family: Arial, sans-serif;line-height:20px; font-size:14px;">
												<small><b>Horário do servidor:</b> <span style="color:#f0f0f0">'. date('d/m/Y H:i:s') .' </span><b>- IP: </b><span style="color:#f0f0f0">'.$ip.'</span></small>
											</td>
										</tr>
										<tr>
											<td style="color: #ffffff; font-family: Arial, sans-serif; font-size: 14px;">
											Shelley Macedo | DEV Shell &copy; '.date('Y').' | Todos os direitos reservados. <br/>
											</td>
										</tr>
									</table>
								</td>
							</tr>
						</table>
					</td>
				</tr>
			</table>';

	$mail = new PHPMailer;
	$mail->IsSMTP();
	$mail->CharSet = 'UTF-8';

	//Server settings
	$mail->SMTPDebug = 0;                                        // Enable verbose debug output
	//$mail->SMTPDebug = 2;
	//$mail->Debugoutput = 'html';
	$mail->SMTPAuth = true;                      // Enable SMTP authentication
	$mail->SMTPSecure = 'ssl';
	$mail->Port = 465;                               // TCP port to connect to
	//$mail->SMTPAutoTLS = false;

	$mail->Host = 'mail.devshell.com.br';    // Specify main and backup SMTP servers
	$mail->Username = 'no-reply@devshell.com.br';     // SMTP username
	$mail->Password = 'a1s2d3f4g5';                    // SMTP password


	//Recipients
	$mail->setFrom($email, $nome);
 
	$mail->AddAddress('atendimento@devshell.com.br', 'Contato Via Site');
	$mail->AddBCC('shelley.macedo@hotmail.com', 'Contato Via Site');
	$mail->AddReplyTo($email, $nome); 


	// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
	$mail->IsHTML(true); // Define que o e-mail será enviado como HTML
	$mail->Subject  = $assunto; // Assunto da mensagem
	$mail->Body = $corpo;

	try
	{
		if (!$mail->Send())
		{
			$retorno['msg'] = 0;
			$retorno['erro'] = "E-mail não pode ser enviado. Erro: " . $mail->ErrorInfo;
		}
		else
		{
			$retorno['msg'] = 1;
			$retorno['erro'] = "E-mail enviado com Sucesso!";
		}

		// Limpa os destinatários e os anexos
		$mail->ClearAllRecipients();

		echo json_encode($retorno);

	}
	catch(Exception $e)
	{
		$retorno['msg'] = 0;
		$retorno['erro'] = "E-mail não pode ser enviado. Erro: " . $mail->ErrorInfo;
	}

?>
