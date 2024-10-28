<script lang="ts">
  // Icons
  import FaUser from 'svelte-icons/fa/FaUser.svelte';
  import FaCheckCircle from 'svelte-icons/fa/FaCheckCircle.svelte';
  import FaExpeditedssl from 'svelte-icons/fa/FaExpeditedssl.svelte';
  import FaEdit from 'svelte-icons/fa/FaEdit.svelte';
  import IoIosMail from 'svelte-icons/io/IoIosMail.svelte';

  // Components
  import EditModal from '$lib/components/modal/EditModal.svelte';

  // Transitions
  import {fade} from 'svelte/transition';

  // Store
  import {emailStore, isActivatedStore, usernameStore} from '../../../store/store';

  // Variables
  let showText: boolean = false;
  let modalType: string = '';
  let modal = false;

  // Functions
  function handleIcon(value: boolean) {
    showText = value;
  }

  function setModal(type: string) {
    modalType = type;
    modal = true;
  }

  function handleModal() {
    modalType = '';
    modal = !modal;
  }

  const password = ('*').repeat(15)

</script>

<div class="w-full m-5 p-5 border border-gray-300 rounded-lg bg-whitesmoke">
  {#if modal}
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
         in:fade={{ duration: 100 }}
         out:fade={{duration: 100}}
    >
      <EditModal type={modalType} {handleModal} />
    </div>
  {/if}
  <div class="mb-5">
    <div class="text-2xl mb-3 font-semibold">Account Setting</div>
    <div class="flex flex-col gap-4">
      <div class="flex items-center">
        <div class="flex items-center flex-1 gap-2">

          <div class="w-6 h-6 b text-gray-500">
            <FaUser />
          </div>

          <span>Username</span>
        </div>
        <div class="flex-1 font-medium">{$usernameStore}</div>
        <button class="ml-auto cursor-pointer" on:click={() => setModal('username')}>
          <div class="w-6 h-6 b text-gray-500">
            <FaEdit />
          </div>
        </button>
      </div>
      <div class="flex items-center">
        <div class="flex items-center flex-1 gap-2 h-8">
          <div class="w-6 h-6 b text-gray-500">
            <IoIosMail />
          </div>

          <span>Email</span>
          {#if $isActivatedStore}
            <div class="w-auto items-center justify-center"
                 on:mouseenter={() => handleIcon(true)}
                 on:mouseleave={() => handleIcon(false)}
            >
              <div class="w-5 h-5 b text-green-600">
                <FaCheckCircle />
              </div>

            </div>
          {:else}
            <div class="w-auto items-center justify-center"
                 on:mouseenter={() => handleIcon(true)}
                 on:mouseleave={() => handleIcon(false)}
            >
              <div class="w-5 h-5 b text-red-500">
                <FaCheckCircle />
              </div>

            </div>
          {/if}
          {#if showText}
            {#if $isActivatedStore}
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
        <div class="flex-1 font-medium">{$emailStore}</div>
        <button class="ml-auto cursor-pointer" on:click={() => setModal('email')}>
          <div class="w-6 h-6 b text-gray-500">
            <FaEdit />
          </div>
        </button>
      </div>
      <div class="flex items-center">
        <div class="flex items-center flex-1 gap-2">
          <div class="w-6 h-6 b text-gray-500">
            <FaExpeditedssl />
          </div>

          <span>Password</span>
        </div>
        <div class="flex-1 font-medium">{password}</div>
        <button class="ml-auto cursor-pointer" on:click={() => setModal('password')}>
          <div class="w-6 h-6 b text-gray-500">
            <FaEdit />
          </div>
        </button>
      </div>
    </div>
  </div>

</div>
