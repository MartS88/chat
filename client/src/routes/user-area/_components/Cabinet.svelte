<script lang="ts">

  // Components
  import Icon from '$lib/components/ui/icon/Icon.svelte';
  import EditModal from '$lib/components/modal/EditModal.svelte';

  // Transitions
  import {fade} from 'svelte/transition';

  // Variables
  let user = {
    username: 'dexter',
    email: '',
    isActivated: false
  };
  let password = ('*').repeat(user.email.length);
  let showText: boolean = false;

  let modalType;
  let modal = false;

  // Functions
  function handleIcon(value: boolean) {
    showText = value;
  }

  function setModal(type:string) {
    modalType = type
    modal = true
  }
  function handleModal(){
    modalType = ''
    modal = !modal;
  }
  if (typeof window !== 'undefined') {
    user.email = localStorage.getItem('email') || '';
    user.isActivated = localStorage.getItem('isActivated') === 'true';
    password = '*'.repeat(user.email.length);
  }


</script>

<div class="w-full m-5 p-5 border border-gray-300 rounded-lg" style="background-color: whitesmoke">
  {#if modal}
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center" in:fade={{ duration: 100 }}>
      <EditModal type={modalType} {handleModal}/>
    </div>
  {/if}
  <div class="mb-5">
    <div class="text-2xl mb-3 font-semibold">Account Setting</div>
    <div class="flex flex-col ">
      <div class="flex items-center mb-4">
        <div class="flex items-center flex-1 gap-2">
          <Icon iconType="FaUser" iconWidth="25" iconHeight="25" iconColor="gray" />
          <span>Username</span>
        </div>
        <div class="flex-1 font-medium">{user.username}</div>
        <button class="ml-auto cursor-pointer" on:click={() => setModal('username')}>
          <Icon iconType="FaEdit" iconWidth="25" iconHeight="25" iconColor="gray" />
        </button>
      </div>
      <div class="flex items-center mb-4">
        <div class="flex items-center flex-1 gap-2">
          <Icon iconType="IoIosMail" iconWidth="25" iconHeight="25" iconColor="gray" />
          <span>Email</span>
          {#if user.isActivated}
            <div class="w-auto items-center justify-center h-5"
                 on:mouseenter={() => handleIcon(true)}
                 on:mouseleave={() => handleIcon(false)}
            >
              <Icon iconType="FaCheckCircle"
                    iconWidth="20"
                    iconHeight="20"
                    iconColor="green"
              />
            </div>
          {:else}
            <div class="w-auto items-center justify-center h-5"
                 on:mouseenter={() => handleIcon(true)}
                 on:mouseleave={() => handleIcon(false)}
            >
              <Icon iconType="FaCheckCircle"
                    iconWidth="20"
                    iconHeight="20"
                    iconColor="red"
              />
            </div>
          {/if}
          {#if showText}
            {#if user.isActivated}
                <span class="ml-2 text-sm font-semibold text-green-600 bg-green-100 px-2 py-1 rounded-lg">
                  Email is activated
                </span>
            {:else}
                <span class="ml-2 text-sm font-semibold text-red-600 bg-red-100 px-2 py-1 rounded-lg">
                  Email is not activated
                </span>
            {/if}
          {/if}
        </div>
        <div class="flex-1 font-medium">{user.email}</div>
        <button class="ml-auto cursor-pointer" on:click={() => setModal('email')}>
          <Icon iconType="FaEdit" iconWidth="25" iconHeight="25" iconColor="gray" />
        </button>
      </div>
      <div class="flex items-center mb-4">
        <div class="flex items-center flex-1 gap-2">
          <Icon iconType="FaExpeditedssl" iconWidth="25" iconHeight="25" iconColor="gray" />
          <span>Password</span>
        </div>
        <div class="flex-1 font-medium">{password}</div>
        <button class="ml-auto cursor-pointer" on:click={() => setModal('password')}>
          <Icon iconType="FaEdit" iconWidth="25" iconHeight="25" iconColor="gray" />
        </button>
      </div>
    </div>
  </div>

</div>
