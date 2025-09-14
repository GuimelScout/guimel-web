"use client"

import React, { useEffect, useState } from "react";
import Label from "@/components/Label";
import Input from "@/shared/Input";
import Textarea from "@/shared/Textarea";
import ButtonPrimary from "@/shared/ButtonPrimary";
import ButtonSecondary from "@/shared/ButtonSecondary";
import { useUser } from "context/UserContext";
import { RouteGuimel } from "@/routers/routes";
import { useRouter } from "next/navigation";
import { LOG_OUT_MUTATION } from "@/components/Guimel/login/QueryLogin.queries";
import { useMutation, useQuery } from "@apollo/client";
import { GET_USER_QUERY } from "@/components/Guimel/account/QueryUser.queries";
import { useUserEdit } from "@/components/Guimel/account/hooks/useUserEdit";
import ImageUpload from "@/components/Guimel/account/components/ImageUpload";
import SocialMediaForm from "@/components/Guimel/account/components/SocialMediaForm";
import UserStats from "@/components/Guimel/account/components/UserStats";
import CountryCodeSelector from "@/components/Guimel/account/components/CountryCodeSelector";
import { UserType } from "@/components/Guimel/account/UserTypes";
import { 
  UserIcon, 
  PencilIcon, 
  CheckIcon, 
  XMarkIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon
} from "@heroicons/react/24/outline";

export interface AccountPageProps {
}

function AccountPage({}: AccountPageProps) {
  const router = useRouter();
  const { user: contextUser, loading: contextLoading, setUser, refreshUser } = useUser();
  const [logout] = useMutation(LOG_OUT_MUTATION);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  // Fetch detailed user data
  const { data: userData, loading: userLoading } = useQuery<{ user: UserType }>(GET_USER_QUERY, {
    variables: { id: contextUser?.id },
    skip: !contextUser?.id,
    fetchPolicy: "cache-and-network"
  });

  const user = userData?.user || contextUser;
  const loading = contextLoading || userLoading;

  const {
    formData,
    isEditing,
    isLoading,
    error,
    success,
    setIsEditing,
    handleInputChange,
    handleCountryCodeChange,
    handleSave,
    handleCancel,
    handleImageUpload,
    hasChanges
  } = useUserEdit(user as UserType);

  useEffect(() => {
    if (!loading && !user) {
      router.push(RouteGuimel.login);
    }
  }, [user, loading, router]);

  const handleLogout = async () => {
    try {
      await logout();
      setUser(undefined);
      refreshUser();
      router.replace(RouteGuimel.home);
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const renderLoadingState = () => (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-64 animate-pulse"></div>
        <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-32 animate-pulse"></div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex flex-col items-center space-y-4">
              <div className="w-32 h-32 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 animate-pulse"></div>
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2 animate-pulse"></div>
            </div>
          </div>
        </div>
        <div className="lg:col-span-2 space-y-6">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
              <div className="space-y-4">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4 animate-pulse"></div>
                <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderHeader = () => (
    <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6 mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-xl">
            <UserIcon className="w-8 h-8 text-purple-600 dark:text-purple-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Mi Perfil
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Gestiona tu información personal y preferencias
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {!isEditing ? (
            <ButtonPrimary
              onClick={() => setIsEditing(true)}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-colors flex items-center gap-2"
            >
              <PencilIcon className="w-4 h-4" />
              Editar Perfil
            </ButtonPrimary>
          ) : (
            <div className="flex items-center gap-2">
              <ButtonSecondary
                onClick={handleCancel}
                className="px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
              >
                <XMarkIcon className="w-4 h-4" />
                Cancelar
              </ButtonSecondary>
              <ButtonPrimary
                onClick={handleSave}
                disabled={!hasChanges || isLoading}
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <CheckIcon className="w-4 h-4" />
                )}
                Guardar
              </ButtonPrimary>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderAlerts = () => (
    <div className="space-y-4">
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 flex items-center gap-3">
          <ExclamationTriangleIcon className="w-5 h-5 text-red-500 flex-shrink-0" />
          <p className="text-red-700 dark:text-red-400 text-sm">{error}</p>
        </div>
      )}
      {success && (
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 flex items-center gap-3">
          <CheckCircleIcon className="w-5 h-5 text-green-500 flex-shrink-0" />
          <p className="text-green-700 dark:text-green-400 text-sm">{success}</p>
        </div>
      )}
    </div>
  );

  const renderPersonalInfo = () => (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
        Información Personal
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label>Nombre *</Label>
          <Input
            className="mt-1.5"
            value={formData.name || ''}
            onChange={(e) => handleInputChange('name', e.target.value)}
            disabled={!isEditing}
            placeholder="Tu nombre"
          />
        </div>
        <div>
          <Label>Apellido Paterno *</Label>
          <Input
            className="mt-1.5"
            value={formData.lastName || ''}
            onChange={(e) => handleInputChange('lastName', e.target.value)}
            disabled={!isEditing}
            placeholder="Tu apellido paterno"
          />
        </div>
        <div>
          <Label>Apellido Materno</Label>
          <Input
            className="mt-1.5"
            value={formData.secondLastName || ''}
            onChange={(e) => handleInputChange('secondLastName', e.target.value)}
            disabled={!isEditing}
            placeholder="Tu apellido materno"
          />
        </div>
        <div>
          <Label>Email *</Label>
          <Input
            className="mt-1.5"
            type="email"
            value={formData.email || ''}
            onChange={(e) => handleInputChange('email', e.target.value)}
            disabled={!isEditing}
            placeholder="tu@email.com"
          />
        </div>
        <div>
          <Label>Teléfono</Label>
          <Input
            className="mt-1.5"
            value={formData.phone || ''}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            disabled={!isEditing}
            placeholder="+52 123 456 7890"
          />
        </div>
        <div>
          <Label>Código de País</Label>
          <div className="mt-1.5">
            <CountryCodeSelector
              value={formData.countryCode || ''}
              onChange={handleCountryCodeChange}
              disabled={!isEditing}
              placeholder="Seleccionar país"
            />
          </div>
        </div>
      </div>
      <div className="mt-6">
        <Label>Descripción</Label>
        <Textarea
          className="mt-1.5"
          value={formData.description || ''}
          onChange={(e) => handleInputChange('description', e.target.value)}
          disabled={!isEditing}
          placeholder="Cuéntanos un poco sobre ti..."
          rows={4}
        />
      </div>
    </div>
  );

  const renderProfileImage = () => (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
        Foto de Perfil
      </h3>
      <ImageUpload
        currentImageUrl={user?.image?.url}
        onImageUpload={handleImageUpload}
        isEditing={isEditing}
        isLoading={isLoading}
      />
    </div>
  );

  const renderLogoutSection = () => (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Sesión
      </h3>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            ¿Necesitas cerrar sesión?
          </p>
        </div>
        <ButtonSecondary
          onClick={() => setShowLogoutConfirm(true)}
          className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 px-4 py-2 rounded-lg transition-colors"
        >
          Cerrar Sesión
        </ButtonSecondary>
      </div>
    </div>
  );

  const renderLogoutModal = () => (
    showLogoutConfirm && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-md w-full">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Confirmar Cierre de Sesión
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            ¿Estás seguro de que quieres cerrar sesión? Tendrás que iniciar sesión nuevamente para acceder a tu cuenta.
          </p>
          <div className="flex items-center gap-3">
            <ButtonSecondary
              onClick={() => setShowLogoutConfirm(false)}
              className="flex-1"
            >
              Cancelar
            </ButtonSecondary>
            <ButtonPrimary
              onClick={handleLogout}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white"
            >
              Cerrar Sesión
            </ButtonPrimary>
          </div>
        </div>
      </div>
    )
  );

  if (loading) {
    return renderLoadingState();
  }

  return (
    <div className="space-y-8">
      {renderHeader()}
      {renderAlerts()}
      {user && <UserStats user={user as UserType} />}
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          {renderProfileImage()}
          {renderLogoutSection()}
        </div>
        
        <div className="lg:col-span-2 space-y-6">
          {renderPersonalInfo()}
          <SocialMediaForm
            formData={formData}
            onInputChange={handleInputChange}
            isEditing={isEditing}
          />
        </div>
      </div>

      {renderLogoutModal()}
    </div>
  );
}


export default AccountPage;