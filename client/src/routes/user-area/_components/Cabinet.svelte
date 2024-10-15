<script lang="ts">

  // Components
  import Icon from '$lib/components/ui/icon/Icon.svelte';

  // Variables
  let user = {
    username: 'dexter',
    email: '',
    isActivated: false,
  };
  let password = ('*').repeat(user.email.length)
  let showText: boolean = false;

  // Functions
  function handleIcon(value: boolean) {
    showText = value;
  }

  if (typeof window !== 'undefined') {
    user.email = localStorage.getItem('email') || '';
    user.isActivated = localStorage.getItem('isActivated') === 'true';
    password = '*'.repeat(user.email.length);
  }

</script>


  <div class="w-full m-5 p-5 border border-gray-300 rounded-lg" style="background-color: whitesmoke">
    <div class="mb-5">
      <div class="text-2xl mb-3 font-semibold">Account Setting</div>
      <div class="flex flex-col ">
        <div class="flex items-center mb-4">
          <div class="flex items-center flex-1 gap-2">
            <Icon iconType="FaUser" iconWidth="25" iconHeight="25" iconColor="gray" />
            <span>Username</span>
          </div>
          <div class="flex-1 font-medium">{user.username}</div>
          <button class="ml-auto cursor-pointer">
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
          <button class="ml-auto cursor-pointer">
            <Icon iconType="FaEdit" iconWidth="25" iconHeight="25" iconColor="gray" />
          </button>
        </div>
        <div class="flex items-center mb-4">
          <div class="flex items-center flex-1 gap-2">
            <Icon iconType="FaExpeditedssl" iconWidth="25" iconHeight="25" iconColor="gray" />
            <span>Password</span>
          </div>
          <div class="flex-1 font-medium">{password}</div>
          <button class="ml-auto cursor-pointer">
            <Icon iconType="FaEdit" iconWidth="25" iconHeight="25" iconColor="gray" />
          </button>
        </div>
      </div>
    </div>
  </div>
