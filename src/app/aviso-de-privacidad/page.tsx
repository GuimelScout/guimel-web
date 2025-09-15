"use client";

import React from 'react';
import { ShieldCheckIcon, EyeIcon, LockClosedIcon, UserGroupIcon, BuildingOfficeIcon, MapPinIcon, ClockIcon } from '@heroicons/react/24/outline';

const AvisoDePrivacidad = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full mb-6">
            <ShieldCheckIcon className="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Aviso de Privacidad Integral
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Última actualización: 14 septiembre 2025
          </p>
        </div>

        {/* Content */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 space-y-8">
          
          {/* Responsible Information */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <BuildingOfficeIcon className="w-6 h-6 text-green-600 mr-2" />
              1. Denominación y domicilio del responsable
            </h2>
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                <strong>GScouting SAS</strong>, con domicilio en Villas los Pinos, 2942, Los Pinos, C.P. 64770, 
                en Monterrey, Nuevo León, es responsable del tratamiento de los datos personales que nos proporcione. 
                Estos datos serán protegidos de acuerdo con las leyes de protección de datos aplicables y demás 
                normatividad que resulte aplicable.
              </p>
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                <MapPinIcon className="w-4 h-4 mr-2" />
                <span>Villas los Pinos, 2942, Los Pinos, C.P. 64770, Monterrey, Nuevo León</span>
              </div>
            </div>
          </section>

          {/* Datos Personales */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              2. Datos personales que serán sometidos a tratamiento
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
              Los datos personales que recabamos y que serán sometidos a tratamiento son:
            </p>
            <div className="space-y-6">
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Datos de identificación</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                  <li>Nombre completo</li>
                  <li>Fecha de nacimiento</li>
                  <li>Sexo</li>
                  <li>Nacionalidad</li>
                </ul>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Datos de contacto</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                  <li>Correo electrónico</li>
                  <li>Número de teléfono</li>
                  <li>Dirección de domicilio</li>
                </ul>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Datos financieros y de pago</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                  <li>Información de tarjeta de crédito/débito</li>
                  <li>Dirección de facturación</li>
                </ul>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Datos de la reserva</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                  <li>Fechas de entrada y salida</li>
                  <li>Número de huéspedes</li>
                  <li>Preferencias de viaje</li>
                  <li>Historial de reservas</li>
                </ul>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Datos de uso de la plataforma</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                  <li>Dirección IP</li>
                  <li>Tipo de navegador</li>
                  <li>Sistema operativo</li>
                  <li>Preferencias de idioma</li>
                  <li>Actividad en el sitio web (páginas visitadas, clics)</li>
                </ul>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Datos de interacción</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                  <li>Comentarios</li>
                  <li>Reseñas</li>
                  <li>Mensajes enviados a otros usuarios (huéspedes o anfitriones)</li>
                </ul>
              </div>
            </div>
            <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
              <p className="text-yellow-800 dark:text-yellow-200 text-sm font-medium">
                <strong>Importante:</strong> No recabamos datos personales sensibles.
              </p>
            </div>
          </section>

          {/* Finalidades del Tratamiento */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              3. Finalidades del tratamiento
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
              Los datos personales que se recaban se utilizarán para las siguientes finalidades:
            </p>
            
            <div className="space-y-6">
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6">
                <h3 className="text-lg font-medium text-green-900 dark:text-green-200 mb-4">
                  Finalidades primarias (necesarias para el servicio)
                </h3>
                <ul className="list-disc list-inside space-y-2 text-green-800 dark:text-green-300">
                  <li>Gestionar, procesar y confirmar las reservas de alojamiento</li>
                  <li>Permitir la comunicación entre huéspedes y anfitriones/propiedades</li>
                  <li>Procesar los pagos de forma segura a través de nuestros proveedores de servicios de pago</li>
                  <li>Verificar la identidad del usuario para prevenir fraudes</li>
                  <li>Enviarle notificaciones sobre el estado de su reserva</li>
                </ul>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
                <h3 className="text-lg font-medium text-blue-900 dark:text-blue-200 mb-4">
                  Finalidades secundarias (no necesarias para el servicio)
                </h3>
                <ul className="list-disc list-inside space-y-2 text-blue-800 dark:text-blue-300">
                  <li>Envío de correos electrónicos con ofertas, promociones y novedades sobre nuestros servicios</li>
                  <li>Análisis de su comportamiento de navegación para personalizar la experiencia de usuario y ofrecerle recomendaciones</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Transferencia de Datos */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              4. Transferencia de datos personales
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
              Le informamos que realizamos las siguientes transferencias de datos personales para las cuales requerimos de su consentimiento:
            </p>
            
            <div className="space-y-6">
              <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Anfitriones o propiedades</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  <strong>Finalidades de la transferencia:</strong> Proporcionar la información necesaria para gestionar y facilitar la reserva de alojamiento (nombre completo, fechas de la reserva, número de huéspedes, etc.).
                </p>
              </div>

              <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Procesadores de pagos externos</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  <strong>Finalidades de la transferencia:</strong> Procesar de forma segura los pagos realizados por los usuarios.
                </p>
              </div>

              <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Proveedores de servicios de análisis de datos (ej. Google Analytics)</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  <strong>Finalidades de la transferencia:</strong> Analizar el uso del sitio web para mejorar su funcionalidad y la experiencia del usuario.
                </p>
              </div>
            </div>
          </section>

          {/* Negativa del Consentimiento */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              5. Negativa del consentimiento
            </h2>
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6">
              <p className="text-yellow-800 dark:text-yellow-200">
                Si no desea que sus datos personales se transfieran para alguna o todas las finalidades secundarias o transferencias señaladas, 
                puede manifestarlo a continuación o a través de los mecanismos que se describen en el siguiente apartado.
              </p>
            </div>
          </section>

          {/* Fundamento Legal */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              6. Fundamento legal
            </h2>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
              <p className="text-gray-700 dark:text-gray-300">
                El tratamiento de sus datos personales se realiza con fundamento en [un abogado debe incluir aquí los artículos, 
                secciones y nombre de las leyes que aplican a tu negocio y que lo facultan para el tratamiento de datos personales, 
                por ejemplo, los artículos de la Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP) en México].
              </p>
            </div>
          </section>

          {/* Derechos ARCO */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              7. Derechos ARCO y domicilio de la Unidad de Transparencia
            </h2>
            <div className="space-y-4">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Para ejercer los derechos de acceso, rectificación, cancelación y oposición de sus datos personales (derechos ARCO), 
                usted puede enviar un correo electrónico a la dirección legal@gscouting.com, acudir a nuestro domicilio o Villas los Pinos 2942.
              </p>
              
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6">
                <h3 className="text-lg font-medium text-green-900 dark:text-green-200 mb-4">Retención de Datos</h3>
                <p className="text-green-800 dark:text-green-300 leading-relaxed">
                  GScouting retendrá sus datos personales únicamente el tiempo necesario para cumplir con los fines para los cuales fueron recabados, 
                  como la gestión de reservaciones, la prevención de fraudes o el cumplimiento de obligaciones legales. Finalizada la finalidad, 
                  los datos serán destruidos de forma segura o anonimizados, salvo que existan obligaciones legales, contables o de seguridad que exijan su conservación.
                </p>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
                <h3 className="text-lg font-medium text-blue-900 dark:text-blue-200 mb-4">Sus Derechos</h3>
                <p className="text-blue-800 dark:text-blue-300 leading-relaxed mb-4">
                  Usted tiene derecho a acceder, rectificar, eliminar, restringir, oponerse y solicitar portabilidad de sus datos. 
                  Para ejercer estos derechos o resolver dudas, puede contactarnos en contacto@gscouting.com.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm text-blue-800 dark:text-blue-300">Acceso</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm text-blue-800 dark:text-blue-300">Rectificación</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm text-blue-800 dark:text-blue-300">Eliminación</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm text-blue-800 dark:text-blue-300">Restricción</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm text-blue-800 dark:text-blue-300">Oposición</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm text-blue-800 dark:text-blue-300">Portabilidad</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Cambios al Aviso */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              8. Cambios al aviso de privacidad integral
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              El presente aviso de privacidad puede sufrir modificaciones, cambios o actualizaciones derivadas de nuevos requerimientos legales, 
              de las necesidades propias de la prestación de nuestros servicios, o por otras causas. En caso de que se realicen cambios, 
              lo haremos de su conocimiento en [SITIOWEB].
            </p>
          </section>

          {/* Creation Date */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <ClockIcon className="w-6 h-6 text-green-600 mr-2" />
              9. Fecha de elaboración o última actualización
            </h2>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Fecha de elaboración o actualización:</strong> 08/09/2025
              </p>
            </div>
          </section>

          {/* Contacto */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              10. Contacto
            </h2>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Para ejercer sus derechos ARCO o resolver dudas sobre este aviso de privacidad:
              </p>
              <div className="space-y-2 text-sm">
                <p><strong>Email Legal:</strong> legal@gscouting.com</p>
                <p><strong>Email Contacto:</strong> contacto@gscouting.com</p>
                <p><strong>Domicilio:</strong> Villas los Pinos, 2942, Los Pinos, C.P. 64770, Monterrey, Nuevo León</p>
              </div>
            </div>
          </section>

          {/* Aviso Legal */}
          <div className="mt-8 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
            <p className="text-yellow-800 dark:text-yellow-200 text-sm">
              <strong>Recuerda:</strong> Este documento es un borrador. Es imprescindible que un profesional del derecho lo revise y adapte a las normativas vigentes en tu país.
            </p>
          </div>

        </div>

        {/* Footer */}
        <div className="text-center mt-12">
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Tu privacidad es importante para nosotros. Gracias por confiar en GScouting.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AvisoDePrivacidad;