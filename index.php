<head>
	<meta charset="utf-8" />
	<style>
		body {
			margin: 0;
		}
		.hakukenttä {
			padding: 8px;
			border: 0px;
			border-bottom: 2px solid #31e83d;
			box-sizing: border-box;
		}

		.lomake:focus .hakukenttä {
			width: 50%;
		}

		.lomake:hover .hakukenttä {
			width: 50%;
		}

		.haenappi {
			background-color: #72c955;
			padding: 8px;
			border-radius: 5px;
		}

		.haenappi:hover {
			transition-duration: 1s;
			background-color: #5ad631;
			padding: 14px;
		}
	</style>
	<script
  src="https://code.jquery.com/jquery-3.4.1.min.js"
  integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo="
  crossorigin="anonymous"></script>
</head>

<?php
	//Tämä tekee tulee objektin sisään, jolloinka proxy kautta mentävä sivu ei ns. vahingoitu
	if ($_GET["proxy"] === "ok") {
		//Tee curl resurssi
		$ch = curl_init();

		//Aseta url GET datana vastaanotetuksi ja str_ireplacella (case insensitive) poistetaan lokaalien tiedostojen lukeminen
		curl_setopt($ch, CURLOPT_URL, str_ireplace( "file://", "Kielletty://",$_GET["url"]));

		//Palauta siirto stringinä
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

		//Seuraa edelleenohjauksia
		curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);

		//Data sisältää siirron stringin
		$data = curl_exec($ch);

		//Sulkee curlin
		curl_close($ch);

		//Näyttää datan ja utf8_decode hyväksyy ääkköset
		echo $data;

	} else {
		?>
			<form class="lomake" method="POST" action="">
				<center><input class="hakukenttä" type="text" name="url"><input class="haenappi" type="submit" value="Go!"></center>
			</form>
			<object width="100%" style="height: 100%;" data="?proxy=ok&url=<?php echo $_POST["url"]; ?>">
				Your browser doesn't support object tags. Change browser!
			</object>

		<?php
	}
?>
