Learnary
=================

Learnary is an ongoing side-project resulting from my frustration with many of the dated, Flash-based educational games my children get for their homework at school.

Just because these games are educational, it doesn't mean they can't be fresh, modern and responsive. This project uses AngularJS to power a modern UI and to allow new games to be added easily in the form of dynamically loaded Angular modules.

Installation
------------------

Learnary was developed within the Laravel/Homestead environment, and the following instructions assume access to a Homestead environment:

**Clone this repo into your Homestead mapped folder and add the following to your ```~/.homestead/Homestead.yaml file:```**

```ruby
sites:
    - map: learnary.local
      to: /home/vagrant/Code/Learnary/public

databases:
  - learnary_db      
```

**Then map the IP address in your /etc/hosts file, like so:**

```
192.168.10.10   learnary.local
```

**Then it should be a case of navigating to your Homestead directory and running:**

```
vagrant up --provision
```

**Once the Vagrant box has finished provisioning, run:**

```
vagrant ssh
cd /your/vagrant/box/structure/learnary
php artisan migrate
php artisan db:seed
```
