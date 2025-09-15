"use client";

import React from 'react';
import { DocumentTextIcon, ShieldCheckIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';

const TerminosYCondiciones = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-6">
            <DocumentTextIcon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Términos y Condiciones
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Última actualización: 14 septiembre 2025
          </p>
        </div>

        {/* Content */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 space-y-8">
          
          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <ShieldCheckIcon className="w-6 h-6 text-blue-600 mr-2" />
              1. Introducción
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Bienvenido a Guimel, una plataforma que conecta a viajeros con experiencias únicas y hospedajes auténticos. 
              Al utilizar nuestros servicios, aceptas estos términos y condiciones. Te recomendamos leerlos cuidadosamente.
            </p>
          </section>

          {/* Definiciones */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              2. Definiciones
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Plataforma</h3>
                <p className="text-gray-700 dark:text-gray-300">Se refiere al sitio web, aplicaciones móviles y servicios de Guimel.</p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Usuario</h3>
                <p className="text-gray-700 dark:text-gray-300">Persona que utiliza la plataforma para buscar y reservar actividades o hospedajes.</p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Anfitrión</h3>
                <p className="text-gray-700 dark:text-gray-300">Persona que ofrece actividades o hospedajes a través de la plataforma.</p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Servicios</h3>
                <p className="text-gray-700 dark:text-gray-300">Actividades, hospedajes y otros servicios ofrecidos en la plataforma.</p>
              </div>
            </div>
          </section>

          {/* Uso de la Plataforma */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              3. Uso de la Plataforma
            </h2>
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">3.1 Requisitos de Registro</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                <li>Debes ser mayor de 18 años para utilizar nuestros servicios</li>
                <li>Proporcionar información veraz y actualizada</li>
                <li>Mantener la confidencialidad de tu cuenta</li>
                <li>Notificar inmediatamente cualquier uso no autorizado</li>
              </ul>

              <h3 className="text-lg font-medium text-gray-900 dark:text-white">3.2 Uso Aceptable</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                <li>Utilizar la plataforma de acuerdo con las leyes aplicables</li>
                <li>Respetar los derechos de otros usuarios</li>
                <li>No interferir con el funcionamiento de la plataforma</li>
                <li>No utilizar la plataforma para actividades ilegales</li>
              </ul>
            </div>
          </section>

          {/* Reservas y Pagos */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              4. Reservas y Pagos
            </h2>
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">4.1 Proceso de Reserva</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Las reservas se realizan a través de nuestra plataforma. Al confirmar una reserva, 
                aceptas los términos específicos del servicio y te comprometes a cumplir con las políticas de cancelación.
              </p>

              <h3 className="text-lg font-medium text-gray-900 dark:text-white">4.2 Pagos</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                <li>Los pagos se procesan de forma segura a través de Stripe</li>
                <li>Los precios incluyen impuestos aplicables</li>
                <li>Las tarifas de servicio se muestran claramente antes de la confirmación</li>
                <li>Los reembolsos se procesan según nuestras políticas de cancelación</li>
              </ul>
            </div>
          </section>

          {/* Responsabilidades */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              5. Responsabilidades
            </h2>
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">5.1 Responsabilidades del Usuario</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                <li>Llegar puntualmente a las actividades reservadas</li>
                <li>Respetar las reglas y políticas del anfitrión</li>
                <li>Comunicar cualquier problema o inquietud</li>
                <li>Mantener un comportamiento respetuoso</li>
              </ul>

              <h3 className="text-lg font-medium text-gray-900 dark:text-white">5.2 Responsabilidades del Anfitrión</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                <li>Proporcionar servicios de calidad según la descripción</li>
                <li>Cumplir con los horarios acordados</li>
                <li>Mantener un ambiente seguro y limpio</li>
                <li>Responder a las consultas de los usuarios</li>
              </ul>
            </div>
          </section>

          {/* Cancelaciones */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              6. Políticas de Cancelación
            </h2>
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
              <div className="flex items-start">
                <ExclamationTriangleIcon className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">Política de Cancelación</h3>
                  <ul className="text-sm text-yellow-700 dark:text-yellow-300 space-y-1">
                    <li>• Cancelaciones con más de 48 horas de anticipación: Reembolso completo</li>
                    <li>• Cancelaciones entre 24-48 horas: Reembolso del 50%</li>
                    <li>• Cancelaciones con menos de 24 horas: Sin reembolso</li>
                    <li>• Cancelaciones por condiciones climáticas: Reembolso completo o reprogramación</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Limitation of Liability */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              7. Limitación de Responsabilidad
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Guimel actúa como intermediario entre usuarios y anfitriones. No somos responsables por 
              los servicios proporcionados por terceros, pero trabajamos para resolver cualquier 
              disputa de manera justa y eficiente.
            </p>
          </section>

          {/* Modificaciones */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              8. Modificaciones
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Nos reservamos el derecho de modificar estos términos en cualquier momento. 
              Las modificaciones entrarán en vigor inmediatamente después de su publicación. 
              Es tu responsabilidad revisar periódicamente estos términos.
            </p>
          </section>

          {/* Contacto */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              9. Contacto
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Si tienes preguntas sobre estos términos y condiciones, puedes contactarnos a través de 
              nuestra página de contacto o enviando un correo electrónico a legal@guimel.com
            </p>
          </section>

        </div>

        {/* Footer */}
        <div className="text-center mt-12">
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Al utilizar Guimel, aceptas estos términos y condiciones.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TerminosYCondiciones;
